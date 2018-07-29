// contains JS code of index.html

var socket = io(); //initiates a request by client to server to create a socket connection between and keep it alive.
socket.on('connect',function(){ //we can use arrowfuncs too, simple ones used for sake of compatibility with IE, FIREFOX, etc.
    console.log('Connected to server');

//     socket.emit('createMessage',{ //this emitter was placed inside on.connect listener is because we want to send object to server after being connected 
//         to: 'server@backend',
//         text:'I know right!',
//         createAt:12346
//     });
}); //the function is similar to one at server-side just that here we have direct reference to the socket connection made.

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    console.log('New message!',message); //custom event-listener!
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#messages').append(li)
});

socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location<a/>') //_blank opens the link in new tab, so we dont get kicked out of the room
    li.text(`${message.from}:`);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li)
});

// socket.emit('createMessage',{
//     from: 'client',
//     text:'dummy message'
// },function (ackMessage) { // this function fires up when we receive acknowledgement
//     console.log(`Got the acknowledgment! ${ackMessage}`);
// });

////jQuery Code below////

var messageTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit',function(e){ //e is the event object passed to the function when submit happens
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text:messageTextBox.val()
    }, function(){
        messageTextBox.val(''); //reset the form contents once user clicks on it
    });
});

//finding and doing stuff to location button

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser'); //alert() is default available for pop-ups
    } //geolocation API is usually present in all modern browsers, this is to check just in case...

    locationButton.attr('disabled','disabled').text('Sending location...'); //disabling button for the while when request is being processed
    navigator.geolocation.getCurrentPosition(function(position){ // gCP function takes in 2 funcs, 1st one called on success, 2nd on failure
        locationButton.removeAttr('disabled').text('Send location'); //re-enabling after succes!
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});