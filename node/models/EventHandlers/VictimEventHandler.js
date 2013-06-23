var AbstractEventHandler = require('./AbstractEventHandler'),
	HighScoreEventHandler = require('./HighScoreEventHandler');

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
		var victim = this.victimGods[data.levelId].getVictim(data.id);
		if (victim) {
			var score = victim.data.killPoints;
			this.victimGods[data.levelId].removeKilledVictim(data.id);
			player.updateScore(score);

			this.createDirectResponse(player, HighScoreEventHandler.CLASS_NAME, 'updateScore', player.getScore());
		}
	}

	this.createBroadcastResponse(player, VictimEventHandler.CLASS_NAME, 'died', victim);
}

module.exports = VictimEventHandler;
