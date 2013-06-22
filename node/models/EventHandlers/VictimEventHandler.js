var AbstractEventHandler = require('./AbstractEventHandler.js');

var VictimEventHandler = function () {
	this.victimGods = {};

}

VictimEventHandler.prototype = AbstractEventHandler.prototype;
VictimEventHandler.CLASS_NAME = 'Victim';

VictimEventHandler.prototype.push = function (player, victim) {
	return this.createBroadcastResponse(player, VictimEventHandler.CLASS_NAME, 'push', victim);
}

VictimEventHandler.prototype.registerVictimGod = function (levelId, victimGod) {
	this.victimGods[levelId] = victimGod;
};

VictimEventHandler.prototype.collide = function (player, data) {
	if (this.victimGods[data.levelId]) {
		this.victimGods[data.levelId].removeKilledVictim(data.id);
	}

	this.createBroadcastResponse(player, VictimEventHandler.CLASS_NAME, 'died', {
		'id': data.id
	});
}

module.exports = VictimEventHandler;
