var ConnectionEventFactory = require('../ConnectionEventFactory'),
	LevelEventHandler = require('../EventHandlers/LevelEventHandler'),
	VictimEventHandler = require('../EventHandlers/VictimEventHandler'),
	DataLoaderFactory = require('../DataLoaderFactory'),
	LevelGenerator = require('./LevelGenerator'),
	VictimGod = require('../Victim/VictimGod');

var dataLoaderFactory = new DataLoaderFactory();
var levelGenerator = new LevelGenerator(dataLoaderFactory);

var Level = function (levelId, connectionEventFactory) {
	this.levelData = levelGenerator.getLevel(levelId);
	this.players = [];
	this.levelEventHandler = connectionEventFactory.getEventHandler(LevelEventHandler.CLASS_NAME);
	this.victimEventHandler = connectionEventFactory.getEventHandler(VictimEventHandler.CLASS_NAME);

	this.victimGod = new VictimGod(this.levelData, dataLoaderFactory);
	this.victimEventHandler.registerVictimGod(levelId, this.victimGod);

	for (var i = 0; i < this.levelData.startVictims; i++) {
		this.spawnVictim();
	}
	var that = this;
	setInterval(function() {
		if (that.victimGod.victims.length < that.levelData.maxVictims) {
			that.spawnVictim();
		}
	}, 1000);
};

Level.prototype.addPlayer = function (player) {
	var level = {
		'levelData': this.levelData,
		'playerPositions': this.getPlayerPositions(player),
		'victims': this.victimGod.victims
	};

	this.players.push(player);
	this.levelEventHandler.enter(player, level);
};

Level.prototype.removePlayer = function (player) {
	var newPlayer = [];

	var test = this.players;
	for (var index in this.players) {
		if (this.players[index].playerId === player.playerId) {
			continue;
		}

		newPlayer.push(this.players[index]);
	}

	this.players = newPlayer;
};

Level.prototype.spawnVictim = function () {
	var victim = this.victimGod.buildVictim();

	if (this.players.length > 0 && victim) {
		this.victimEventHandler.push(this.players[0], victim);
	}
};

Level.prototype.getPlayerPositions = function(player) {
	var playerPositions = [];

	for (var i in this.players) {
		playerPositions.push({
			'playerId': this.players[i].playerId,
			'x': this.players[i].position.x,
			'y': this.players[i].position.y,
			'angle': this.players[i].position.angle,
			'isDead': this.players[i].isDead
		});
	}

	return playerPositions;
}

module.exports = Level;


