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

PlayerMessageHandler.prototype.callLetMeDie = function (data) {
	socket.send(JSON.stringify({
		"class" : "Player",
		"method": "letMeDie",
		"data": data
	}));
};

PlayerMessageHandler.prototype.newPlayerPosition = function(data) {
	Application.scenes['level'].updatePlayerPositions([data]);
};

PlayerMessageHandler.prototype.newPlayer = function(data) {
	console.log(data);

	if (Application.scenes['level']._isInitialized) {
		Application.scenes['level'].addPlayer(data);
	}
};
