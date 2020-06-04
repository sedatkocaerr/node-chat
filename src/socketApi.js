const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();
const socketApi =
{
    io

};
// libs
const Users = require('./lib/Users');
const Rooms = require('./lib/Rooms');
const Messages = require('./lib/Messages');
// socket autharization
io.use(socketAuthorization);
/**
 * Redis Adapter 
 */
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter(
    {host:process.env.REDIS_URI,
    port:process.env.REDIS_PORT
}));


io.on('connection',socket =>{
    console.log('a user logged in with name '+socket.request.user.name);
    
    Users.upsert(socket.id,socket.request.user);

    Users.list(users =>{
        io.emit('onlinelist',users);
    });

    socket.on('disconnect',()=>{
        Users.remove(socket.request.user._id);

        Users.list(users =>{
            io.emit('onlinelist',users);
        });
    });

    Rooms.list(rooms =>{
        socket.emit('rooms',rooms);
    });

    socket.on('newRoom',roomName =>{
        Rooms.upsert(roomName);
        
        Rooms.list(rooms =>{
            socket.emit('rooms',rooms);
        });
    });

    socket.on('newMessage',message =>{
        Messages.upsert(message.roomId,
            message.message,
            socket.request.user.name,
            socket.request.user.surname
        );
        
    });

    socket.on('messagelist',roomId =>{
        Messages.list(roomId ,messagelist=>{
            socket.emit("getmessagelist",messagelist);
        });
        
    });
    
});



module.exports = socketApi;