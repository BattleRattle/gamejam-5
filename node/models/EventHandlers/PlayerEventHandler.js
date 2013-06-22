var AbstractEventHandler = require('./AbstractEventHandler.js');

var PlayerEventHandler = function () {

	this.victimCounter = 0;
	this.victims = [];

}

PlayerEventHandler.prototype = AbstractEventHandler.prototype;
PlayerEventHandler.CLASS_NAME = 'Player';

PlayerEventHandler.prototype.updatePosition = function (player, data) {
	this.createBroadcastResponse(player, PlayerEventHandler.CLASS_NAME, 'newPlayerPosition', {
		'playerId': player.playerId,
		'x': data.x,
		'y': data.y,
		'angle': data.angle
	});
}

module.exports = PlayerEventHandler;
