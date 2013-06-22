var fs = require("fs"),
	path = require('path');

var loadData = function () {
	var levels = {};
	var pathToData = path.normalize(__dirname + "/../../data/Levels");
	fs.readdirSync(pathToData).forEach(function (levelJson) {
		var stats = fs.lstatSync(pathToData + "/" + levelJson);
		if (!stats.isDirectory() && fs.existsSync(pathToData + "/" + levelJson)) {
			var data = require(pathToData + "/" + levelJson);
			levels[data.name] = data;
		}
	});

	return levels;
}

var LevelDataLoader = function() {
	this.levels = loadData();

	for (var level in this.levels) {
		if (level.default) {
			this.defaultLevel = level.name;
		}
	}
}

LevelDataLoader.prototype.getData = function(levelId) {
	if (!this.levels[levelId]) {
		levelId = this.defaultLevel;
		console.log ("Tried to load undefined level:", levelId);
	}

	return this.levels[levelId];
};

module.exports = LevelDataLoader;
