const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;

const server = express()
    .use(express.static(path.join(__dirname, 'public')))
    .use((req, res) => res.sendFile(path.join(__dirname, 'index.html')))
    .listen(port, () => console.log(`Listening on ${port}`));

var io = require('socket.io')(server);

io.on("connection", function (socket) {


    socket.emit('connected');
    //Fired when the client is going to be disconnected (but hasn't left its rooms yet).
    socket.on('disconnecting', (reason) => {
        let rooms = Object.keys(socket.rooms);
        console.log('rooms:',rooms);
        console.log('disconnecting:',reason);
    });
    socket.on('disconnect', (reason) => {
        console.log('disconnect:',reason);
    });
    socket.on('error', (error) => {
        console.log('error:',error);
    });
});

