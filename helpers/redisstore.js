const session = require('express-session');
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT,process.env.REDIS_URI,{ auth_pass : process.env.REDIS_PASS});
const redisStore = require("connect-redis")(session);


module.exports = new redisStore({
    client,
    host:process.env.REDIS_URI,
    port:process.env.REDIS_PORT,
    pass:process.env.REDIS_PASS
});