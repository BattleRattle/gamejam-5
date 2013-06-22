var LevelMessageHandler = function (socket) {
	this.socket = socket;
};

LevelMessageHandler.prototype.getData = function (data) {
	Application.levelData = data;
};
