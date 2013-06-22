var AbstractEventHandler = require('./AbstractEventHandler.js');
var DataLoaderFactory = require('../DataLoaderFactory.js');

var LevelEventHandler = function () {

	this.victimCounter = 0;
	this.victims = [];
	this.dataLoaderFactory = new DataLoaderFactory();

}

LevelEventHandler.prototype = AbstractEventHandler.prototype;
LevelEventHandler.CLASS_NAME = 'Level';

LevelEventHandler.prototype.enter = function (player, data) {
	var mapDataLoader = this.dataLoaderFactory.getDataLoader('Map');
	var mapData = mapDataLoader.getData(data.levelId);

	return this.createBroadcastResponse(LevelEventHandler.CLASS_NAME, 'getData', {
		'levelId': data.levelId,
		'mapData': mapData
	});
}

module.exports = LevelEventHandler;
