var ConnectionEventFactory = require('./ConnectionEventFactory.js');
var Response = require('./Communication/Response.js');

var ConnectionHandler = function (io) {

	this.io = io;
	this.connections = [];
	this.connectionEventFactory = new ConnectionEventFactory();

	this.init();

}

ConnectionHandler.prototype.init = function () {
	var that = this;

	this.io.sockets.on('connection', function (socket) {
		that.handleConnection(socket);
	});
}

ConnectionHandler.prototype.handleConnection = function (socket) {
	var that = this;
	this.connections.push(socket);

	socket.emit('debug', process.env.DEBUG ? true : false);

	socket.on('message', function (data) {
		that.handleResponse(socket, that.callEventHandler(data));
	});

	socket.on('disconnect', function () {
		that.handleDisconnect(socket);
	});
}

ConnectionHandler.prototype.handleDisconnect = function (socket) {
	// @TODO: inform clients

	var newConnections = [];
	for (var existingSocket in this.connections) {
		if (socket === existingSocket) {
			continue;
		}

		newConnections.push(existingSocket);
	}

	this.connections = newConnections;
}

ConnectionHandler.prototype.callEventHandler = function (data) {
	var object = JSON.parse(data);
	var handler = this.connectionEventFactory.getEventHandler(object.class);

	return handler[object.method](object.data);
}

ConnectionHandler.prototype.handleResponse = function (socket, response) {
	if (!response) {
		return;
	}

	if (response.getType() === Response.prototype.TYPE_DIRECT) {
		this.sendResponse(socket, response);
	} else if (response.getType() === Response.prototype.TYPE_BROADCAST) {
		this.sendBroadcast(response);
	} else {
		throw new Error('Response type not implemented: ' + response.getType());
	}
}

ConnectionHandler.prototype.sendResponse = function (socket, response) {
	socket.send(this.createRawResponse(response));
}

ConnectionHandler.prototype.sendBroadcast = function (response) {
	this.io.sockets.send(this.createRawResponse(response));
}

ConnectionHandler.prototype.createRawResponse = function (response) {
	return JSON.stringify({
		'class': response.getRemoteClass(),
		'method': response.getMethod(),
		'data': response.getData()
	});
}

module.exports = ConnectionHandler;
