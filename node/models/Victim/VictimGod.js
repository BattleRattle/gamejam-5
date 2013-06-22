var VictimGod = function(levelId, levelData) {
	console.log("victim god", levelId)
	this.victims = [];
	this.victimCounter = 0;

	this.levelId = levelId;
	this.levelData = levelData;
};

VictimGod.prototype.buildVictim = function () {
	var victim = {
		'id': this.levelId + ++this.victimCounter,
		'levelId': this.levelId,
		'x': 25,// * this.victimCounter,
		'y': 25,// * this.victimCounter
	};

	this.victims.push(victim);

	return victim;
};

VictimGod.prototype.removeKilledVictim = function (victimId) {
	var newVictims = [];

	for (var index in this.victims) {
		if (this.victims[index].id === victimId) {
			continue;
		}

		newVictims.push(this.victims[index]);
	}

	this.victims = newVictims;
};

module.exports = VictimGod;

