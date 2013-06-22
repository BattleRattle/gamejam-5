var Response = require('../Communication/Response.js');

var AbstractEventHandler = function () {

	throw new Error('AbstractEventHandler is an abstract class');

}

AbstractEventHandler.prototype.setConnectionHandler = function (connectionHandler) {
	this.connectionHandler = connectionHandler;
}

AbstractEventHandler.prototype.getConnectionHandler = function () {
	return this.connectionHandler;
}

AbstractEventHandler.prototype.createDirectResponse = function (player, remoteClass, method, data) {
	var response = new Response(remoteClass, method, Response.prototype.TYPE_DIRECT, data);
	this.connectionHandler.handleResponse(player.getSocket(), response);
}

AbstractEventHandler.prototype.createBroadcastResponse = function (player, remoteClass, method, data) {
	var response = new Response(remoteClass, method, Response.prototype.TYPE_BROADCAST, data);
	this.connectionHandler.handleResponse(player.getSocket(), response);
}

module.exports = AbstractEventHandler;
