var VictimMessageHandler = function (socket) {
	this.socket = socket;
};

VictimMessageHandler.prototype.push = function (data) {
	Application.scenes['level'].addVictim(data);
};

VictimMessageHandler.prototype.died = function (data) {
	Application.scenes['level'].removeVictim(data);
};
