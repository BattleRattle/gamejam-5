var ConnectionEventFactory = require('./ConnectionEventFactory.js');

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
		var response = that.callEventHandler(data)

		if (response) {
			that.sendResponse(socket, data, response);
		}
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

ConnectionHandler.prototype.sendResponse = function (socket, request, response) {
	var result = {};
	var object = JSON.parse(request);

	result.class = object.class;
	result.method = object.method;
	result.data = response;

	socket.send(JSON.stringify(result));
}

ConnectionHandler.prototype.broadcast = function(remoteClass, method, data) {
	this.io.sockets.send(JSON.stringify({
		'class': remoteClass,
		'method': method,
		'data': data
	}));
}

module.exports = ConnectionHandler;
