var LevelMessageHandler = function (socket) {
	this.socket = socket;
};

LevelMessageHandler.prototype.getData = function (data) {
	Application.levelData = data.levelData;
//	Application.scenes['level'].updatePlayerPositions(data.playerPositions);
};

LevelMessageHandler.prototype.callGetPlayerPositions = function() {
	socket.send(JSON.stringify({
		"class" : "Level",
		"method": "getPlayerPositions"
	}));
};

LevelMessageHandler.prototype.playerPositions = function(data) {
//	Application.scenes['level'].updatePlayerPositions(data);
};
