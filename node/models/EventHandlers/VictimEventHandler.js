var AbstractEventHandler = require('./AbstractEventHandler.js');

var VictimEventHandler = function () {

	this.victimCounter = 0;
	this.victims = [];

}

VictimEventHandler.prototype = AbstractEventHandler.prototype;
VictimEventHandler.prototype.CLASS_NAME = 'Victim';

VictimEventHandler.prototype.push = function () {
	var victim = {
		'id': ++this.victimCounter,
		'x': 1130,
		'y': 230
	};
	this.victims.push(victim);

	return victim;
}

VictimEventHandler.prototype.collide = function (data) {
	var newVictims = [];

	for (var victim in this.victims) {
		if (victim.id === data.id) {
			continue;
		}

		newVictims.push(victim);
	}

	this.victims = newVictims;

	return this.createBroadcastResponse(this.CLASS_NAME, 'died', {
		'id': data.id
	});
}

module.exports = VictimEventHandler;
