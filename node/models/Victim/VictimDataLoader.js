var fs = require("fs"),
	path = require('path');

var loadData = function () {
	var victims = {};
	var pathToData = path.normalize(__dirname + "/../../data/Victims");
	fs.readdirSync(pathToData).forEach(function (victimJson) {
		var stats = fs.lstatSync(pathToData + "/" + victimJson);
		if (!stats.isDirectory() && fs.existsSync(pathToData + "/" + victimJson)) {
			var data = require(pathToData + "/" + victimJson);
			victims[data.id] = data;
		}
	});

	return victims;
}

var VictimDataLoader = function() {
	this.victims = loadData();

	for (var victim in this.victims) {
		if (this.victims[victim].default) {
			this.defaultVictim = victim.name;
		}
	}
}

VictimDataLoader.prototype.getData = function(victimId) {
	if (!this.victims[victimId]) {
		victimId = this.defaultVictim;
		console.log ("Tried to load undefined victim:", victimId);
	}

	return this.victims[victimId];
};

module.exports = VictimDataLoader;
