var MapTileDataLoader = require('./Map/MapTileDataLoader'),
	MapDataLoader = require('./Map/MapDataLoader'),
	LevelDataLoader = require('./Level/LevelDataLoader');

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

		default:
			throw new Error('data loader is not implemented: ' + dataLoader);
	}

	return this.dataLoader[dataLoader];
};

module.exports = DataLoaderFactory;
