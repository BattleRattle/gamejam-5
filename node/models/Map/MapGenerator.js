function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var MapGenerator = function(dataLoaderFactory) {
	this.maps = new Array();
	this.dataLoaderFactory = dataLoaderFactory;
};

MapGenerator.prototype.getMap = function (mapId) {
	if (!this.maps[mapId]) {
		this.maps[mapId] = this.generateMap(mapId);
	}

	return this.maps[mapId];
};

MapGenerator.prototype.generateMap = function (mapId) {
	var levelDataLoader = this.dataLoaderFactory.getDataLoader('Map');
	var mapTileDataLoader = this.dataLoaderFactory.getDataLoader('MapTiles');

	var map = {
		id: mapId,
		tilesets: {},
		tiles: [],
		size: {}
	};

	var groupedTileSets = {};
	var levelData = levelDataLoader.getData(mapId);
	for (var i = levelData.tilesets.length - 1; i >= 0; i--) {
		var tile = mapTileDataLoader.getData(levelData.tilesets[i]);
		if (typeof groupedTileSets[tile.position] == "undefined") {
			groupedTileSets[tile.position] = [];
		}

		groupedTileSets[tile.position].push(tile);
	}

	map.size = levelData.size;

	var width = map.size.width;
	var height = map.size.height;
	for (var x = 0; x < width; x++) {
		var firstLevelPosition = "";
		if (0 == x) {
			firstLevelPosition += "N";
		} else if (width - 1 == x) {
			firstLevelPosition += "S";
		}

		map.tiles[x] = [];
		for (var y = 0; y < height; y++) {
			var position = firstLevelPosition;
			if (y == 0) {
				position += "W";
			} else if (y == height - 1) {
				position += "E";
			}

			if (position == "") {
				position = "*";
			}

			if (groupedTileSets[position].length == 1) {
				var rand = 0;
			} else {
				var rand = getRandomInt(0, groupedTileSets[position].length - 1);
			}

			var tile = groupedTileSets[position][rand];
			map.tiles[x][y] = tile.id;

			if (typeof map.tilesets[tile.id]) {
				map.tilesets[tile.id] = tile;
			}
		}
	}

	return map;
};

module.exports = MapGenerator;
