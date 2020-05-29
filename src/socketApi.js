const socketio = require('socket.io');

const io = socketio();
const socketApi =
{
    io

};

io.on('connection',socket =>{

    console.log('Socket api connect');
});

module.exports = socketApi;