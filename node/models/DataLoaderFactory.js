var MapTileDataLoader = require('./Map/MapTileDataLoader'),
	MapDataLoader = require('./Map/MapDataLoader'),
	LevelDataLoader = require('./Level/LevelDataLoader'),
	VictimDataLoader = require('./Victim/VictimDataLoader'),
	SplatterDataLoader = require('./Splatter/SplatterDataLoader'),
	CarDataLoader = require('./Car/CarDataLoader');

var DataLoaderFactory = function() {

	this.dataLoader = {};

};

DataLoaderFactory.prototype.getDataLoader = function(dataLoader) {
	if (this.dataLoader[dataLoader]) {
		return this.dataLoader[dataLoader];
	}

	switch (dataLoader) {
		case 'MapTiles':
			this.dataLoader[dataLoader] = new MapTileDataLoader();
			break;

		case 'Map':
			this.dataLoader[dataLoader] = new MapDataLoader();
			break;

		case 'Level':
			this.dataLoader[dataLoader] = new LevelDataLoader();
			break;

		case 'Car':
			this.dataLoader[dataLoader] = new CarDataLoader();
			break;

		case 'Victim':
			this.dataLoader[dataLoader] = new VictimDataLoader();
			break;

		case 'Splatter':
			this.dataLoader[dataLoader] = new SplatterDataLoader();
			break;

		default:
			throw new Error('data loader is not implemented: ' + dataLoader);
	}

	return this.dataLoader[dataLoader];
};

module.exports = DataLoaderFactory;
