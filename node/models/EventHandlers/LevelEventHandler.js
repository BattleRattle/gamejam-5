var AbstractEventHandler = require('./AbstractEventHandler.js');

var LevelEventHandler = function () {

	this.victimCounter = 0;
	this.victims = [];

}

LevelEventHandler.prototype = AbstractEventHandler.prototype;
LevelEventHandler.CLASS_NAME = 'Level';

LevelEventHandler.prototype.enter = function (player, levelData) {
	this.createDirectResponse(player, LevelEventHandler.CLASS_NAME, 'getData', levelData);
}

LevelEventHandler.prototype.getPlayerPositions = function (player) {
	var level = this.connectionHandler.game.getLevel(player.getLevel());

	this.createDirectResponse(player, LevelEventHandler.CLASS_NAME, 'playerPositions', level.getPlayerPositions(player));
}

module.exports = LevelEventHandler;
