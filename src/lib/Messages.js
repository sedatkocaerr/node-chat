const redisClient = require('../redisClient');
const _ = require('lodash');
const shortid = require('shortid');
function Messages(){
    this.client = redisClient.getRedis();

};

module.exports = new Messages();

// Insert the redis online key
Messages.prototype.upsert = function (roomId,message,username,surname,userId){
    
    this.client.hset(
        'messages:'+roomId,
        shortid.generate(),
        JSON.stringify({
            userId,
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


Messages.prototype.list = function (roomId,callback){

    let messagelistdata = []
    this.client.hgetall(
        'messages:'+roomId,
        function(err,messagelist){
            if(err)
            {
                console.log(messagelist);
                return null;
            }

          for (let message in messagelist){
            messagelistdata.push(JSON.parse(messagelist[message]));
          }  

          return callback(_.orderBy(messagelistdata,'when','asc'));
        }
    )

};
