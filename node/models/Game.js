var Response = require('./Communication/Response.js');
var DataLoaderFactory = require('./DataLoaderFactory.js');
var Player = require('./Player.js');
var Level = require('./Level/Level');
var PlayerEventHandler = require('./EventHandlers/PlayerEventHandler.js');

var Game = function(connectionHandler) {

	this.connectionHandler = connectionHandler;
	this.connectionEventFactory = this.connectionHandler.connectionEventFactory;
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

	var playerHandler = this.connectionEventFactory.getEventHandler(PlayerEventHandler.CLASS_NAME);
	playerHandler.callNewPlayer(player);

	return player;
};

Game.prototype.removePlayer = function(socket) {
	var player = this.getPlayerBySocket(socket);
	var playerHandler = this.connectionEventFactory.getEventHandler(PlayerEventHandler.CLASS_NAME);
	playerHandler.callPlayerLeft(player);

	var level = player.getLevel();
	this.levels[level].removePlayer(player);

	var newPlayers = [];
	for (var i in this.players) {
		if (this.players[i] === player) {
			continue;
		}

		newPlayers.push(this.players[i]);
	}
	this.players = newPlayers;
}

Game.prototype.getLevel = function (levelId) {
	if (!this.levels[levelId]) {
		this.levels[levelId] = new Level(levelId, this.connectionEventFactory);
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
