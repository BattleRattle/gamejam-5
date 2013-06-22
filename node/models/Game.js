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

//	this.dataLoaderFactory.getDataLoader('Level');

	this.connectionHandler.init(this);

}

Game.prototype.start = function() {
	var that = this;
	var victimEventHandler = this.connectionEventFactory.getEventHandler('Victim');

	setInterval(function() {
		var victimEventHandler = that.connectionEventFactory.getEventHandler(VictimEventHandler.CLASS_NAME);
		victimEventHandler.push();
	}, 1000);
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

module.exports = Game;
