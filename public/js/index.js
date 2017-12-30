var socket = io();
socket.on('connect', function() {
    console.log('Connected to server'); 
});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});
socket.on('newMessage', function(message) {
    
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        time: formattedTime
    });
    $('#messages').append(html);
    // var li = $('<li></li>');
    // li.html(`${message.from}: ${message.text}`);
    // $('#messages').append(li);
});

$(document).ready(function() {
    $('#message-form').on('submit', function(e) {
        e.preventDefault();
        $('#send-button').attr('disabled', 'disabled');
        var inputMessage = $('#message');
        var messageBoard = $("#messages");
        socket.emit('createMessage',{
            from: 'User',
            text: inputMessage.val()
        }, function() {
            inputMessage.val('');
            $('#send-button').removeAttr('disabled');
            var position = $(messageBoard).find(':last-child').position();
            if (position.top >= messageBoard.height()) {
                messageBoard.scrollTop(messageBoard.prop('scrollHeight'));
            }
        });
    })
});

