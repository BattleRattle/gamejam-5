function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var VictimGod = function(levelData, dataLoaderFactory) {
	this.victims = [];
	this.victimCounter = 0;

	this.levelId = levelData.id;
	this.levelData = levelData;

	this.victimDataLoaderFactory = dataLoaderFactory.getDataLoader('Victim');
	this.splatterDataLoaderFactory = dataLoaderFactory.getDataLoader('Splatter');
};

VictimGod.prototype.buildVictim = function () {
	var tileset = {
		x: 	getRandomInt(1, this.levelData.map.size.width - 2),
		y: getRandomInt(1, this.levelData.map.size.height - 2)
	};

	var victimData = this.selectVictim();
	var path = this.selectPath(tileset.x, tileset.y);

	if (path) {
		var counter = ++this.victimCounter;
		var victim = {
			'id': this.levelId + "" + counter,
			'levelId': this.levelId,
			'data': victimData,
			'tileset': tileset,
			'path': path,
			'splatter': this.splatterDataLoaderFactory.getRandom()
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

