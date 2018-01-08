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
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});


socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>');
    users.forEach(function (user) {
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
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
        socket.emit('createMessage', {
            text: inputMessage.val()
        }, function() {
            inputMessage.val('').focus();
        });
    })
});

