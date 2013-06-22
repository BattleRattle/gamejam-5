var VictimMessageHandler = function (socket) {
	this.socket = socket;
};

VictimMessageHandler.prototype.push = function (data) {
	console.log("victim",data)
	Application.scenes['level'].addVictim(data);
};

VictimMessageHandler.prototype.died = function (data) {
	Application.scenes['level'].removeVictim(data);
};

VictimMessageHandler.prototype.callCollide = function (data) {
	socket.send(JSON.stringify({
		"class" : "Victim",
		"method": "collide",
		"data": data
	}));
};
