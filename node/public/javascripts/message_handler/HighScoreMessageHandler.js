var HighScoreMessageHandler = function (socket) {
	this.socket = socket;
};

HighScoreMessageHandler.prototype.getHighScore = function (data) {
	Application.scenes["high_score"].setHighScoreData(data);
};

HighScoreMessageHandler.prototype.callGetHighScore = function (data) {
	socket.send(JSON.stringify({
		"class" : "HighScore",
		"method": "getHighScore",
		"data": data
	}));
}
