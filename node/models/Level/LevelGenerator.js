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
	levelData.map = this.mapGenerator.getMap(levelData.mapId);
	levelData.car = this.dataLoaderFactory.getDataLoader("Car").getData(levelData.carId);

	// validate all the victims
	for (var i = levelData.victims.length - 1; i >= 0; i--) {
		this.dataLoaderFactory.getDataLoader("Victim").getData(levelData.victims[i]);
	}

	return levelData;
};

module.exports = LevelGenerator;
