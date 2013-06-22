var MapGenerator = require("./../Map/MapGenerator");

var LevelGenerator = function(dataLoaderFactory) {
	this.levels = [];
	this.dataLoaderFactory = dataLoaderFactory;
	this.mapGenerator = new MapGenerator(dataLoaderFactory);
};

LevelGenerator.prototype.getLevel = function (levelId) {
	if (!this.levels[levelId]) {
		this.levels[levelId] = this.generateLevel(levelId);
	}

	return this.levels[levelId];
};

LevelGenerator.prototype.generateLevel = function (levelId) {
	var levelData = this.dataLoaderFactory.getDataLoader("Level").getData(levelId);
	var level = {
		map: this.mapGenerator.getMap(levelData.mapId)
	}

	return level;
};

module.exports = LevelGenerator;
