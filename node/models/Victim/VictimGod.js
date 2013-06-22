function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var VictimGod = function(levelData, dataLoaderFactory) {
	this.victims = [];
	this.victimCounter = 0;

	this.levelId = levelData.levelId;
	this.levelData = levelData;

	this.victimDataLoaderFactory = dataLoaderFactory.getDataLoader('Victim');
};

VictimGod.prototype.buildVictim = function () {
	var victimData = this.selectVictim();
	var path = this.selectPath(5, 5);

	if (path) {
		var counter = ++this.victimCounter;
		var victim = {
			'id': this.levelId + "" + counter,
			'levelId': this.levelId,
			'data': victimData,
			'tileset': {
				x: 5,
				y: 5
			},
			'path': path
		};

		this.victims.push(victim);

		return victim;
	}

};

VictimGod.prototype.selectVictim = function () {
	if (this.levelData.victims.length == 1) {
		var victimId = this.levelData.victims[0];
	} else {
		var rand = getRandomInt(0, this.levelData.victims.length - 1);
		var victimId = this.levelData.victims[rand];
	}

	return this.victimDataLoaderFactory.getData(victimId);
};

VictimGod.prototype.selectPath = function (x, y) {
	var tilename = this.levelData.map.tiles[x][y];

	var tileset = this.levelData.map.tilesets[tilename];

	if (tileset.paths) {
		var rand = getRandomInt(0, tileset.paths.length - 1);
		return tileset.paths[rand];
	}
}

VictimGod.prototype.getVictim = function (victimId) {
	for (var index in this.victims) {
		if (this.victims[index].id === victimId) {
			return this.victims[index];
		}
	}
}

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

