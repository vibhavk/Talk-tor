const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000; 
var app = express(); 
// we switched from express server to http server(though the former calls the latter anyway) because we wanted to include socket in the gang!
var server = http.createServer(app);
var io = socketIO(server); //we get back a websocket server

var {generateMessage,generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected!');
     
    socket.emit('newMessage', generateMessage(
        'admin',
        'Welcome to Talk-tor!',
    ));

    socket.broadcast.emit('newMessage',generateMessage(
        'admin',
        'A new user joined us'
    ));

    //emitting custom event! with an object containing info we need to pass to the client
    socket.on('createMessage',(message, callback)=>{
        console.log('Someone sent a message!',message);
        io.emit('newMessage',generateMessage(
            message.from,
            message.text,
        ));
        callback();//this callback is fired up as an acknowledgement to the frontend

        // socket.broadcast.emit('newMessage',{ //emits to all but the socket itself.
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // });
    });
    
    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage(
            'admin',
            coords.latitude,
            coords.longitude
        ));
    });

    socket.on('disconnect',()=>{ //function to run when a socket was disconnected
        console.log('User disconnected from server');
    });

}); //event listener registration, here we are listening for a new connection...socket represents the invidual socket connection

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});