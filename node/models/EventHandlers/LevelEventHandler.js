var AbstractEventHandler = require('./AbstractEventHandler.js');

var LevelEventHandler = function () {

	this.victimCounter = 0;
	this.victims = [];

}

LevelEventHandler.prototype = AbstractEventHandler.prototype;
LevelEventHandler.CLASS_NAME = 'Level';

LevelEventHandler.prototype.enter = function (player, levelData) {
	this.createBroadcastResponse(player, LevelEventHandler.CLASS_NAME, 'getData', levelData);
}

module.exports = LevelEventHandler;
