var socket = io();
socket.on('connect', function() {
    console.log('Connected to server'); 
});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});
socket.on('newMessage', function(message) {
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
    console.log('ok');
});

$(document).ready(function() {
    $('#message-form').on('submit', function(e) {
        e.preventDefault();
        var message = $('#message');
        socket.emit('createMessage',{
            from: 'User',
            text: message.val()
        }, function() {

        });
        message.val('');
    })
});

