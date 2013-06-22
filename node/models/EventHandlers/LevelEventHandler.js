var AbstractEventHandler = require('./AbstractEventHandler.js');
var DataLoaderFactory = require('../DataLoaderFactory.js');
var LevelGenerator = require('../Level/LevelGenerator.js');

var LevelEventHandler = function () {

	this.victimCounter = 0;
	this.victims = [];
	this.levelGenerator = new LevelGenerator(new DataLoaderFactory());

}

LevelEventHandler.prototype = AbstractEventHandler.prototype;
LevelEventHandler.CLASS_NAME = 'Level';

LevelEventHandler.prototype.enter = function (player, data) {
	var mapData = this.levelGenerator.getLevel(data.levelId);

	return this.createBroadcastResponse(LevelEventHandler.CLASS_NAME, 'getData', {
		'levelId': data.levelId,
		'mapData': mapData
	});
}

module.exports = LevelEventHandler;
