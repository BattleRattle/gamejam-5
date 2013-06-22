var fs = require("fs"),
	path = require('path');

var loadData = function () {
	var tiles = {};
	var pathToData = path.normalize(__dirname + "/../../data/MapTiles");
	fs.readdirSync(pathToData).forEach(function (tileJson) {
		var stats = fs.lstatSync(pathToData + "/" + tileJson);
		if (!stats.isDirectory() && fs.existsSync(pathToData + "/" + tileJson)) {
			var data = require(pathToData + "/" + tileJson);
			tiles[data.id] = data;
		}
	});

	return tiles;
}

var MapTileDataLoader = function() {
	this.tiles = loadData();

	for (var tile in this.tiles) {
		if (tile.default) {
			this.defaultCar = tile.name;
		}
	}
}

MapTileDataLoader.prototype.getData = function(tileId) {
	if (!this.tiles[tileId]) {
		throw new Error("Tried to load undefined tile:" + tileId);
	}

	return this.tiles[tileId];
};

module.exports = MapTileDataLoader;
