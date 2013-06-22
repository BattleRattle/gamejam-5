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
	var levelData = this.levelGenerator.getLevel(data.levelId);

	return this.createBroadcastResponse(player, LevelEventHandler.CLASS_NAME, 'getData', levelData);
}

module.exports = LevelEventHandler;
