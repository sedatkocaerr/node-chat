const redisClient = require('../redisClient');

function Users(){
    this.client = redisClient.getRedis();

};

module.exports = new Users();

// Insert the redis online key
Users.prototype.upsert = function (connectionId,meta){
    this.client.hset(
        'online',
        meta.googleId,
        JSON.stringify({
            connectionId,
            meta,
            when: Date.now()
        }),
        err =>{
            if(err){
                console.log(err);
            } 
        }
    )
};

// delete the redis online key

Users.prototype.remove = function(googleId){
    this.client.hdel(
        'online',
        googleId,
        err=>{
            if(err)
              {
                console.log(err);
              }
        }

    )
};


Users.prototype.list = function (callback){

    let activeusers = []
    this.client.hgetall(
        'online',
        function(err,users){
            if(err)
            {
                console.log(err);
                return callback([]);
            }

          for (let user in users){
              activeusers.push(JSON.parse(users[user]));
          }  

          return callback(activeusers);
        }
    )

};