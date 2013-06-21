var socket = io.connect('http://localhost:8080');

var handlerFactory = new MessageHandlerFactory(socket);

socket.on('news', function (data) {
	console.log(data);
	socket.emit('my other event', { my: 'data' });
});

socket.on('debug', function (data) {
	console.log("debug: ", data);
	gamvas.config.debug = data;
});

socket.on('message', function (data) {
	var message = JSON.parse(data);
	var handler = handlerFactory.getHandler(message.class);
	handler[message.method](message.data);
});
