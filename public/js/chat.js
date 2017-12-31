var socket = io();

function scrollToBottom() {
    var messages = $('#messages');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');

    var newMessage =  messages.children('li:last-child');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('Connected to server'); 
});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});
socket.on('newMessage', function(message) {
    var messageBoard = $("#messages");
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        time: formattedTime
    });
    messageBoard.append(html);
    scrollToBottom();
});

$(document).ready(function() {
    $('#message-form').on('submit', function(e) {
        e.preventDefault();
        var inputMessage = $('#message');
        var messageBoard = $("#messages");
        socket.emit('createMessage',{
            from: 'User',
            text: inputMessage.val()
        }, function() {
            inputMessage.val('').focus();
        });
    })
});

