var fs = require("fs"),
	path = require('path');

var loadData = function () {
	var cars = {};
	var pathToData = path.normalize(__dirname + "/../../data/Cars");
	fs.readdirSync(pathToData).forEach(function (carJson) {
		var stats = fs.lstatSync(pathToData + "/" + carJson);
		if (!stats.isDirectory() && fs.existsSync(pathToData + "/" + carJson)) {
			var data = require(pathToData + "/" + carJson);
			cars[data.id] = data;
		}
	});

	return cars;
}

var CarDataLoader = function() {
	this.cars = loadData();

	for (var car in this.cars) {
		if (this.cars[car].default) {
			this.defaultCar = car.name;
		}
	}
}

CarDataLoader.prototype.getData = function(carId) {
	if (!this.cars[carId]) {
		carId = this.defaultCar;
		console.log ("Tried to load undefined car:", carId);
	}

	return this.cars[carId];
};

module.exports = CarDataLoader;
