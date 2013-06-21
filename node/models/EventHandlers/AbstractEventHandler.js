var Response = require('../Communication/Response.js');

var AbstractEventHandler = function () {

	throw new Error('AbstractEventHandler is an abstract class');

}

AbstractEventHandler.prototype.createDirectResponse = function(remoteClass, method, data) {
	return new Response(remoteClass, method, Response.TYPE_DIRECT, data);
}

AbstractEventHandler.prototype.createBroadcastResponse = function(remoteClass, method, data) {
	return new Response(remoteClass, method, Response.TYPE_BROADCAST, data);
}

module.exports = AbstractEventHandler;
