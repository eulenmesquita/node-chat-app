const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message'); 
const {isRealString} = require('./utils/validate'); 
const {Users} = require('./utils/users'); 
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });
    
    socket.on('join', (params, callback) => {
        if (!isRealString(params.nickname) || !isRealString(params.room)) {
            return callback('Nickname and Room are required');
        }
        
        socket.join(params.room);
        users.removeUser(socket.id);
        var u = users.addUser(socket.id, params.nickname, params.room);
        
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin','Welcome to the NodeChatApp'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin','A new user just joined the NodeChatApp'));

        callback();
    });
    
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at port: ${port}`)
});
