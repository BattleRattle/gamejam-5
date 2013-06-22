var fs = require("fs"),
	path = require('path');

var loadData = function () {
	var maps = {};
	var pathToData = path.normalize(__dirname + "/../../data/Maps");
	fs.readdirSync(pathToData).forEach(function (mapJson) {
		var stats = fs.lstatSync(pathToData + "/" + mapJson);
		if (!stats.isDirectory() && fs.existsSync(pathToData + "/" + mapJson)) {
			var data = require(pathToData + "/" + mapJson);
			maps[data.id] = data;
		}
	});

	return maps;
}

var MapDataLoader = function() {
	this.maps = loadData();

	for (var map in this.maps) {
		if (this.maps[map].default) {
			this.defaultMap = map.name;
		}
	}
}

MapDataLoader.prototype.getData = function(mapId) {
	if (!this.maps[mapId]) {
		mapId = this.defaultMap;
		console.log ("Tried to load undefined map:", mapId);
	}

	return this.maps[mapId];
};

module.exports = MapDataLoader;
