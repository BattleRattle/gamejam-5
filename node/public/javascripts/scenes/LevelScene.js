levelScene = gamvas.State.extend({
	create: function(name) {
		this._super(name);

		this.victims = [];
		this.players = [];
		this.lazyPlayers = [];
	},

	init: function() {
		gamvas.physics.resetWorld(0, 0, false);
        this.autoClear = false;
		this.hornSound = this.addSound("/sounds/horn-1.mp3");

		this.bombAvailable = true;
	},

	addVictim: function(data) {
		var victim = new victimActor("victim" + data.id, data.x, data.y, data);
		this.victims[data.id] = victim;
		this.addActor(victim);
	},

	removeVictim: function (data) {
		var that = this;
		setTimeout(function() {
			var victim = that.victims[data.id];
			that.addActor(new splatterActor("blood" + data.id, victim.position.x, victim.position.y, data.splatter));
			that.removeActor(victim);
		}, 125);

	},

	addPlayer: function (data) {
		var player = new otherCarActor("car" + data.playerId, 0, 0, Application.levelData.car);
		this.players[data.playerId] = player;
		this.addActor(player);
	},

	addPlayerLazy: function (data) {
		this.lazyPlayers.push(data);
	},

	removePlayer: function (data) {
		this.removeActor(this.players[data.playerId]);
	},

	updatePlayerPositions: function(playerPositions) {
		for (var i in playerPositions) {
			var playerPosition = playerPositions[i];

			if (typeof this.players[playerPosition.playerId] === 'undefined') {
				this.addPlayer(playerPosition);
			}

			this.players[playerPosition.playerId].body.SetPositionAndAngle({
				'x': playerPosition.x,
				'y': playerPosition.y
			}, gamvas.math.degToRad(playerPosition.angle));
		}
	},

	preDraw: function(t) {
		var MIN_ZOOM = 0.8;
		var MAX_ZOOM = 1.3;
		var MAX_VECTOR_LENGTH = 18;

		var velocity = this.carActor.getForwardVelocity();
		if (velocity > MAX_VECTOR_LENGTH / 2 && this.camera.zoomFactor > MIN_ZOOM) {
			this.camera.zoom(-0.2 * t);
		} else if (velocity < MAX_VECTOR_LENGTH / 2 && this.camera.zoomFactor < MAX_ZOOM) {
			this.camera.zoom(0.2 * t);
		} else {
			this.camera.zoom(0);
		}

		// follow the car
		this.camera.setPosition(this.carActor.position.x, this.carActor.position.y);
	},

	playerDied: function(data) {
		for (var i in this.players) {
			var player = this.players[i];
			if (player.name !== 'car' + data.playerId) {
				continue;
			}

			player.removeActor(player, data.x, data.y);
		}
	},

	postDraw: function(t) {
	},

	onMouseDown: function(b, x, y) {
	},

	onKeyDown: function(keyCode, character, ev) {
		switch (keyCode) {
			case gamvas.key.H:
				this.hornSound.play();
				break;
			case gamvas.key.B:
				if (this.bombAvailable) {
					this.bombAvailable = false;
					this.addActor(new bombActor("carbomb" + Application.bombCounter++, this.carActor.position.x, this.carActor.position.y, {size: 6, timeout: 1000 }));
					var that = this;
					setTimeout(function() {
						that.bombAvailable = true;
					}, 750)
				}

				break;
		}
	},

	// switch to rain state on space
	onKeyUp: function(k) {
		return false;
	},

	leave: function () {
		gamvas.physics.resetWorld(0, 0, false);
	},

	enter: function() {
		this.dim = gamvas.getCanvasDimension();

		this.addActor(new cityActor("city", 0, 0, Application.levelData));
		this.addActor(this.carActor = new carActor("car", 0, 0, Application.levelData.car));
		this.addActor(this.score = new scoreActor("score", 0, 0));

		if (gamvas.config.debug) {
			this.addActor(new debugActor("debug"));
		}

		for (var index in Application.levelData.initVictims) {
			this.addVictim(Application.levelData.initVictims[index]);
		}
		delete Application.levelData.victims;

		// lazy load existing players
		for (var i in this.lazyPlayers) {
			this.addPlayer(this.lazyPlayers[i]);
		}

		handlerFactory.getHandler('Level').callGetPlayerPositions();
	},
    loading: function(t) {
        // we don't like the loading screen
        this.draw(t);
    }
});
