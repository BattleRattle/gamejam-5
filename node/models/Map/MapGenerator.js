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
	var mapDataLoader = this.dataLoaderFactory.getDataLoader('Map');
	var mapTileDataLoader = this.dataLoaderFactory.getDataLoader('MapTiles');

	var map = {
		id: mapId,
		tilesets: {},
		tiles: [],
		size: {}
	};

	var groupedTileSets = {};
	var mapData = mapDataLoader.getData(mapId);
	for (var i = mapData.tilesets.length - 1; i >= 0; i--) {
		var tile = mapTileDataLoader.getData(mapData.tilesets[i]);
		if (typeof groupedTileSets[tile.position] == "undefined") {
			groupedTileSets[tile.position] = [];
		}

		groupedTileSets[tile.position].push(tile);
	}

	map.size = mapData.size;

	var width = map.size.width;
	var height = map.size.height;
	for (var x = 0; x < width; x++) {
		var secondLevelPosition = "";
		if (0 == x) {
			secondLevelPosition += "W";
		} else if (width - 1 == x) {
			secondLevelPosition += "E";
		}

		map.tiles[x] = [];
		for (var y = 0; y < height; y++) {
			var firstLevelPosition = "";
			if (y == 0) {
				firstLevelPosition += "N";
			} else if (y == height - 1) {
				firstLevelPosition += "S";
			}

			var position = firstLevelPosition + secondLevelPosition;

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
