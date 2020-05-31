const cookieParser = require('cookie-parser');
const passportSocketIo = require('passport.socketio');
const redisstore = require('../helpers/redisstore');

function onAuthorizeSuccess(data, accept){
	console.log('successful connection to socket.io');

	// The accept-callback still allows us to decide whether to
	// accept the connection or not.
	accept(null, true);
}

function onAuthorizeFail(data, message, error, accept){
	if(error)
		throw new Error(message);
	console.log('failed connection to socket.io:', message);

	// We use this callback to log all of our failed connections.
	accept(null, false);
}

module.exports = passportSocketIo.authorize({
    cookieParser:cookieParser,
    key: 'connect.sid',
    secret:process.env.SECRET_KEY_SESSION,
    store:redisstore,
    success:onAuthorizeSuccess,
    fail:onAuthorizeFail
});