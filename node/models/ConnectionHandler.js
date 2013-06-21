var ConnectionHandler = function (io) {

	this.io = io;
	this.connections = [];

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
		console.log('received message: ' + data);
	});

	socket.emit('news', {
		hello: 'world'
	});

	socket.on('my other event', function (data) {
		console.log(data);
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

module.exports = ConnectionHandler;
