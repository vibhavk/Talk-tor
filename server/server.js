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

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected! Hi!');
     
    //emitting custom event! with an object containing info we need to pass to the client
    socket.on('createMessage',(message)=>{
        console.log('Someone sent a message!',message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        });
    });    
    socket.on('disconnect',()=>{ //function to run when a socket was disconnected
        console.log('User disconnected from server');
    });

}); //event listener registration, here we are listening for a new connection...socket represents the invidual socket connection

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});