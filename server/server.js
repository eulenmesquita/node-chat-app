const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message'); 
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newMessage', generateMessage('Admin','Welcome to the NodeChatApp'));
    
    socket.broadcast.emit('newMessage', generateMessage('Admin','A new user just joined the NodeChatApp'));

    socket.on('createMessage', (message) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
    })
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
        socket.broadcast.emit('newMessage', generateMessage('Admin', 'An user just left the NodeChatApp'));
    });
});

server.listen(port, () => {
    console.log(`Server running at port: ${port}`)
});
