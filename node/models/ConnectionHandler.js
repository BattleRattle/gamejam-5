var ConnectionEventFactory = require('./ConnectionEventFactory.js');
var Response = require('./Communication/Response.js');

var ConnectionHandler = function(io) {

	this.io = io;
	this.game = null;
	this.connectionEventFactory = new ConnectionEventFactory(this);

}

ConnectionHandler.prototype.init = function(game) {
	var that = this;
	this.game = game;

	this.io.sockets.on('connection', function(socket) {
		that.handleConnection(socket);
	});
}

ConnectionHandler.prototype.handleConnection = function(socket) {
	var that = this;
	var player = this.game.createPlayer(socket);

	socket.emit('debug', process.env.DEBUG ? true : false);

	socket.on('message', function(data) {
		that.callEventHandler(player, data);
	});

	socket.on('disconnect', function() {
		that.handleDisconnect(socket);
	});
}

ConnectionHandler.prototype.handleDisconnect = function(socket) {
	this.game.removePlayer(socket);
}

ConnectionHandler.prototype.callEventHandler = function(player, data) {
	var object = JSON.parse(data);
	var handler = this.connectionEventFactory.getEventHandler(object.class);

	return handler[object.method](player, object.data);
}

ConnectionHandler.prototype.handleResponse = function(socket, response) {
	if (!response) {
		return;
	}

	if (response.getType() === Response.prototype.TYPE_DIRECT) {
		this.sendResponse(socket, response);
	} else if (response.getType() === Response.prototype.TYPE_BROADCAST_INCLUDE_SELF) {
		this.sendBroadcast(socket, response, true);
	} else if (response.getType() === Response.prototype.TYPE_BROADCAST_EXCLUDE_SELF) {
		this.sendBroadcast(socket, response, false);
	} else {
		throw new Error('Response type not implemented: ' + response.getType());
	}
}

ConnectionHandler.prototype.sendResponse = function(socket, response) {
	socket.send(this.createRawResponse(response));
}

ConnectionHandler.prototype.sendBroadcast = function(socket, response, includeSelf) {
	var player = this.game.getPlayerBySocket(socket);
	if (!player) {
		return;
	}

	var players = this.game.getPlayersOfSameLevel(player.getLevel());

	for (var i in players) {
		if (players[i] === player && !includeSelf) {
			continue;
		}

		players[i].getSocket().send(this.createRawResponse(response));
	}
}

ConnectionHandler.prototype.createRawResponse = function(response) {
	return JSON.stringify({
		'class': response.getRemoteClass(),
		'method': response.getMethod(),
		'data': response.getData()
	});
}

module.exports = ConnectionHandler;
