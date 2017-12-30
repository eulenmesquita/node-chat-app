var socket = io();
socket.on('connect', function() {
    console.log('Connected to server'); 
});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});
socket.on('newMessage', function(message) {
    var li = $('<li></li>');
    li.html(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

$(document).ready(function() {
    $('#message-form').on('submit', function(e) {
        e.preventDefault();
        $('#send-button').prop('disabled', true);
        var inputMessage = $('#message');
        var messageBoard = $("#messages");
        socket.emit('createMessage',{
            from: 'User',
            text: inputMessage.val()
        }, function() {
            inputMessage.val('');
            inputMessage.focus();
            
            var position = $(messageBoard).find(':last-child').position();
            if (position.top >= messageBoard.height()) {
                messageBoard.scrollTop(messageBoard.prop('scrollHeight'));
            }
            $('#send-button').prop('disabled', false);
        });
    })
});

