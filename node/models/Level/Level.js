var ConnectionEventFactory = require('../ConnectionEventFactory'),
	LevelEventHandler = require('../EventHandlers/LevelEventHandler'),
	VictimEventHandler = require('../EventHandlers/VictimEventHandler'),
	DataLoaderFactory = require('../DataLoaderFactory'),
	LevelGenerator = require('./LevelGenerator'),
	VictimGod = require('../Victim/VictimGod');

var levelGenerator = new LevelGenerator(new DataLoaderFactory());

var Level = function (levelId, connectionEventFactory) {
	this.levelData = levelGenerator.getLevel(levelId);
	this.players = [];
	this.levelEventHandler = connectionEventFactory.getEventHandler(LevelEventHandler.CLASS_NAME);
	this.victimEventHandler = connectionEventFactory.getEventHandler(VictimEventHandler.CLASS_NAME);

	this.victimGod = new VictimGod(levelId, this.levelData);
	this.victimEventHandler.registerVictimGod(levelId, this.victimGod);

	var that = this;
	setInterval(function() {
		that.spawnVictim();
	}, 5000);
};

Level.prototype.addPlayer = function (player) {
	this.players.push(player);

	this.levelEventHandler.enter(player, this.levelData);
};

Level.prototype.removePlayer = function (player) {
	var newPlayer = [];

	for (var index in this.players) {
		if (this.players[index].id === player.id) {
			continue;
		}

		newPlayer.push(this.players[index]);
	}

	this.players = newPlayer;
};

Level.prototype.spawnVictim = function () {
	var victim = this.victimGod.buildVictim();

	if (this.players.length > 0) {
		this.victimEventHandler.push(this.players[0], victim);
	}
};

module.exports = Level;


