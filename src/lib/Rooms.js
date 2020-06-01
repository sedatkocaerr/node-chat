const redisClient = require('../redisClient');
const shortid = require('shortid');
function Rooms(){
    this.client = redisClient.getRedis();

};

module.exports = new Rooms();

// Insert the redis online key
Rooms.prototype.upsert = function (name){
    const RoomId = shortid.generate();
    this.client.hset(
        'rooms',
        '@Room:'+RoomId,
        JSON.stringify({
            id:'@Room:'+RoomId,
            name,
            when: Date.now()
        }),
        err =>{
            if(err){
                console.log(err);
            } 
        }
    )
};

Rooms.prototype.list = function (callback){

    let chatrooms = []
    this.client.hgetall(
        'rooms',
        function(err,rooms){
            if(err)
            {
                console.log(err);
                return callback([]);
            }

          for (let room in rooms){
            chatrooms.push(JSON.parse(rooms[room]));
          }  

          return callback(chatrooms);
        }
    )

};
