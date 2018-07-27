// contains JS code of index.html

var socket = io(); //initiates a request by client to server to create a socket connection between and keep it alive.
socket.on('connect',function(){ //we can use arrowfuncs too, simple ones used for sake of compatibility with IE, FIREFOX, etc.
    console.log('Connected to server');

    socket.emit('createMessage',{ //this emitter was placed inside on.connect listener is because we want to send object to server after being connected 
        to: 'server@backend',
        text:'I know right!',
        createAt:12346
    });
}); //the function is similar to one at server-side just that here we have direct reference to the socket connection made.

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    console.log('New message!',message); //custom event-listener!
});
