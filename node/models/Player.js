var playerId = 0;

var Player = function (socket) {

	this.playerId = ++playerId;
	this.socket = socket;
	this.level = 'tutorial';

}

Player.prototype.getSocket = function () {
	return this.socket;
}

Player.prototype.setLevel = function (level) {
	this.level = level;
}

Player.prototype.getLevel = function () {
	return this.level;
}

module.exports = Player;
