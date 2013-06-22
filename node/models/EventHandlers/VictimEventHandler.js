var AbstractEventHandler = require('./AbstractEventHandler.js');

var VictimEventHandler = function () {

	this.victimCounter = 0;
	this.victims = [];

}

VictimEventHandler.prototype = AbstractEventHandler.prototype;
VictimEventHandler.CLASS_NAME = 'Victim';

VictimEventHandler.prototype.push = function (player, victim) {
	return this.createBroadcastResponse(player, VictimEventHandler.CLASS_NAME, 'push', victim);
}

VictimEventHandler.prototype.collide = function (player, data) {
	var newVictims = [];

	/*for (var victim in this.victims) {
		if (victim.id === data.id) {
			continue;
		}

		newVictims.push(victim);
	}

	this.victims = newVictims;*/

	return this.createBroadcastResponse(player, VictimEventHandler.CLASS_NAME, 'died', {
		'id': data.id
	});
}

module.exports = VictimEventHandler;
