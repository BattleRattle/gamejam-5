var ConnectionEventFactory = require('./ConnectionEventFactory.js');
var Response = require('./Communication/Response.js');
var VictimEventHandler = require('./EventHandlers/VictimEventHandler.js');
var DataLoaderFactory = require('./DataLoaderFactory.js');
var Player = require('./Player.js');
var LevelEventHandler = require('./EventHandlers/LevelEventHandler.js');

var Game = function(connectionHandler) {

	this.connectionHandler = connectionHandler;
	this.connectionEventFactory = new ConnectionEventFactory(connectionHandler);
	this.dataLoaderFactory = new DataLoaderFactory();
	this.players = [];

	this.connectionHandler.init(this);

}

Game.prototype.start = function() {
	var that = this;
	var victimEventHandler = this.connectionEventFactory.getEventHandler('Victim');

	setInterval(function() {
		var victimEventHandler = that.connectionEventFactory.getEventHandler(VictimEventHandler.CLASS_NAME);
		var referencePlayers = that.getOnePlayerForEveryLevel();
		if (!referencePlayers.length) {
			return;
		}

		for (var i in referencePlayers) {
			victimEventHandler.push(referencePlayers[i]);
		}
	}, 9000);
}

Game.prototype.createPlayer = function(socket) {
	var player = new Player(socket);
	this.players.push(player);

	var levelEventHandler = this.connectionEventFactory.getEventHandler(LevelEventHandler.CLASS_NAME);
	levelEventHandler.enter(player, {
		'levelId': player.getLevel()
	});

	return player;
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

Game.prototype.getOnePlayerForEveryLevel = function() {
	var foundPlayers = [];
	var alreadyFound = {};

	for (var i in this.players) {
		var player = this.players[i];
		if (alreadyFound[player.getLevel()]) {
			continue;
		}

		foundPlayers.push(player);
		alreadyFound[player.getLevel()] = true;
	}

	return foundPlayers;
}

module.exports = Game;
