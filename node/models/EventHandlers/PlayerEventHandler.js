var AbstractEventHandler = require('./AbstractEventHandler.js');

var PlayerEventHandler = function() {

	this.victimCounter = 0;
	this.victims = [];

}

PlayerEventHandler.prototype = AbstractEventHandler.prototype;
PlayerEventHandler.CLASS_NAME = 'Player';

PlayerEventHandler.prototype.updatePosition = function(player, data) {
	player.position.x = data.x;
	player.position.y = data.y;
	player.position.angle = data.angle;

	this.createBroadcastResponse(player, PlayerEventHandler.CLASS_NAME, 'newPlayerPosition', {
		'playerId': player.playerId,
		'x': data.x,
		'y': data.y,
		'angle': data.angle
	}, false);
}

PlayerEventHandler.prototype.callNewPlayer = function(player) {
	this.createBroadcastResponse(player, PlayerEventHandler.CLASS_NAME, 'newPlayer', {
		'playerId': player.playerId,
		'x': 0,
		'y': 0,
		'angle': 0
	}, false);
};

PlayerEventHandler.prototype.callPlayerLeft = function(player) {
	this.createBroadcastResponse(player, PlayerEventHandler.CLASS_NAME, 'playerLeft', {
		'playerId': player.playerId
	}, false);
};

PlayerEventHandler.prototype.letMeDie = function(player, data) {
	console.log('player %s died at x: %s, y: %s', player.playerId, data.x, data.y);

	player.isDead = true;
	data.playerId = player.playerId;
	this.createBroadcastResponse(player, PlayerEventHandler.CLASS_NAME, 'playerDied', data, false);
};

module.exports = PlayerEventHandler;
