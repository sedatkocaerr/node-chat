const redisClient = require('../redisClient');
const shortid = require('shortid');
function Messages(){
    this.client = redisClient.getRedis();

};

module.exports = new Messages();

// Insert the redis online key
Messages.prototype.upsert = function (roomId,message,username,surname){
    
    this.client.hset(
        'messages:'+roomId,
        shortid.generate(),
        JSON.stringify({
            username,
            surname,
            message,
            when: Date.now()
        }),
        err =>{
            if(err){
                console.log(err);
            } 
        }
    )
};
