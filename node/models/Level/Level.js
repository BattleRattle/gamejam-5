var ConnectionEventFactory = require('../ConnectionEventFactory'),
	LevelEventHandler = require('../EventHandlers/LevelEventHandler'),
	VictimEventHandler = require('../EventHandlers/VictimEventHandler'),
	DataLoaderFactory = require('../DataLoaderFactory'),
	LevelGenerator = require('./LevelGenerator');

var levelGenerator = new LevelGenerator(new DataLoaderFactory());

var Level = function (levelId, connectionHandler) {
	var connectionEventFactory = new ConnectionEventFactory(connectionHandler);
	this.levelData = levelGenerator.getLevel(levelId);
	this.players = [];
	this.levelEventHandler = connectionEventFactory.getEventHandler(LevelEventHandler.CLASS_NAME);
	this.victimEventHandler = connectionEventFactory.getEventHandler(VictimEventHandler.CLASS_NAME);

	this.victimCounter = 0;
	this.victims = [];

	var that = this;
	setInterval(function() {
		that.spawnVictim();
	}, 10000);
};

Level.prototype.addPlayer = function (player) {
	this.players.push(player);

	this.levelEventHandler.enter(player, this.levelData);
};

Level.prototype.removedPlayer = function (player) {
	// todo
};

Level.prototype.spawnVictim = function () {
	var victim = {
		'id': ++this.victimCounter,
		'x': 25 * this.victimCounter,
		'y': 25 * this.victimCounter
	};

	this.victims.push(victim);

	if (this.players.length > 0) {
		this.victimEventHandler.push(this.players[0], victim);
	}
};

module.exports = Level;


