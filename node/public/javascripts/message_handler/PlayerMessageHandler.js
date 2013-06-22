var PlayerMessageHandler = function (socket) {
	this.socket = socket;
};

PlayerMessageHandler.prototype.callUpdatePosition = function (data) {
	socket.send(JSON.stringify({
		"class" : "Player",
		"method": "updatePosition",
		"data": data
	}));
};

PlayerMessageHandler.prototype.newPlayerPosition = function (data) {
	console.log(data);
};
