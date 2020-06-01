const redis = require('redis');

const getRedis = () =>{
    return redis.createClient({
        host:process.env.REDIS_URI,
        port:process.env.REDIS_PORT
    });
};

module.exports.getRedis = getRedis;