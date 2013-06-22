var playerId = 0;

var Player = function (socket) {

	this.playerId = ++playerId;
	this.socket = socket;

	this.setLevel('tutorial');
}

Player.prototype.getSocket = function () {
	return this.socket;
}

Player.prototype.setLevel = function (level) {
	this.level = level;
	this.score = 0;
	this.kills = 0;
}

Player.prototype.getLevel = function () {
	return this.level;
}

Player.prototype.updateScore = function (killPoints) {
	this.score += killPoints;
	this.kills++;
};

Player.prototype.getScore = function () {
	return {
		playerId: this.playerId,
		score: this.score,
		kills: this.kills
	}
}

module.exports = Player;
