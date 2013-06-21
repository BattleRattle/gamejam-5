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

	socket.on('message', function(data) {
		that.callEventHandler(data);
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

ConnectionHandler.prototype.callEventHandler = function(data) {
	var object = JSON.parse(data);
	var handler = this.connectionEventFactory.getEventHandler(object.class);
	var response = handler[object.method](object.data);
}

module.exports = ConnectionHandler;
