var ConnectionEventFactory = require('./ConnectionEventFactory.js');
var Response = require('./Communication/Response.js');
var DataLoaderFactory = require('./DataLoaderFactory.js');
var Player = require('./Player.js'),
	Level = require('./Level/Level');

var Game = function(connectionHandler) {

	this.connectionHandler = connectionHandler;
	this.connectionEventFactory = new ConnectionEventFactory(connectionHandler);
	this.dataLoaderFactory = new DataLoaderFactory();
	this.players = [];
	this.levels = {};

	this.connectionHandler.init(this);

}

Game.prototype.start = function() {

}

Game.prototype.createPlayer = function(socket) {
	var player = new Player(socket);
	this.players.push(player);

	var level = this.getLevel(player.getLevel());
	level.addPlayer(player);

	return player;
};

Game.prototype.getLevel = function (levelId) {
	if (!this.levels[levelId]) {
		this.levels[levelId] = new Level(levelId, this.connectionHandler);
	}

	return this.levels[levelId];
}

Game.prototype.getPlayersOfSameLevel = function(levelId) {
	var foundPlayers = [];

	for (var player in this.players) {
		if (this.players[player].getLevel() === levelId) {
			foundPlayers.push(this.players[player]);
		}
	}

	return foundPlayers;
}

Game.prototype.getPlayerBySocket = function(socket) {
	var foundPlayer = null;

	for (var player in this.players) {
		if (this.players[player].getSocket() === socket) {
			foundPlayer = this.players[player];
			break;
		}
	}

	return foundPlayer;
}

module.exports = Game;
