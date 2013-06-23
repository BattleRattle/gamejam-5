var fs = require("fs"),
	path = require('path');

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var loadData = function () {
	var splatters = {};
	var pathToData = path.normalize(__dirname + "/../../data/Splatters");
	fs.readdirSync(pathToData).forEach(function (splatterJson) {
		var stats = fs.lstatSync(pathToData + "/" + splatterJson);
		if (!stats.isDirectory() && fs.existsSync(pathToData + "/" + splatterJson)) {
			var data = require(pathToData + "/" + splatterJson);
			splatters[data.id] = data;
		}
	});

	return splatters;
}

var SplatterDataLoader = function() {
	this.splatters = loadData();
	this.splatterArray = [];

	for (var splatter in this.splatters) {
		this.splatterArray.push(this.splatters[splatter]);
	}
}

SplatterDataLoader.prototype.getData = function(splatterId) {
	if (!this.splatters[splatterId]) {
		splatterId = this.defaultSplatter;
		console.log ("Tried to load undefined splatter:", splatterId);
	}

	return this.splatters[splatterId];
};

SplatterDataLoader.prototype.getRandom = function() {
	var rand = getRandomInt(0, this.splatterArray.length - 1);

	return this.splatterArray[rand];
}

module.exports = SplatterDataLoader;
