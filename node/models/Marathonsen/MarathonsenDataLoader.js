var fs = require("fs"),
	path = require('path');

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var loadData = function () {
	var marathonsens = {};
	var pathToData = path.normalize(__dirname + "/../../data/Marathonsen");
	fs.readdirSync(pathToData).forEach(function (marathonsenJson) {
		var stats = fs.lstatSync(pathToData + "/" + marathonsenJson);
		if (!stats.isDirectory() && fs.existsSync(pathToData + "/" + marathonsenJson)) {
			var data = require(pathToData + "/" + marathonsenJson);
			marathonsens[data.id] = data;
		}
	});

	return marathonsens;
}

var MarathonsenDataLoader = function() {
	this.marathonsens = loadData();
	this.marathonsenArray = [];

	for (var marathonsen in this.marathonsens) {
		this.marathonsenArray.push(this.marathonsens[marathonsen]);
	}
}

MarathonsenDataLoader.prototype.getData = function(marathonsenId) {
	if (!this.marathonsens[marathonsenId]) {
		marathonsenId = this.defaultMarathonsen;
		console.log ("Tried to load undefined marathonsen:", marathonsenId);
	}

	return this.marathonsens[marathonsenId];
};

MarathonsenDataLoader.prototype.getRandom = function() {
	var rand = getRandomInt(0, this.marathonsenArray.length - 1);

	return this.marathonsenArray[rand];
}

module.exports = MarathonsenDataLoader;
