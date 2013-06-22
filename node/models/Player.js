var Player = function (socket) {

	this.socket = socket;
	this.level = 'simple';

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
