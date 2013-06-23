levelScene = gamvas.State.extend({
	create: function(name) {
		this._super(name);

		this.victims = [];
		this.players = [];
		this.lazyPlayers = [];
	},

	init: function() {
		gamvas.physics.resetWorld(0, 0, false);
		this.hornSound = this.addSound("/sounds/horn-1.mp3");
	},

	addVictim: function(data) {
		var victim = new victimActor("victim" + data.id, data.x, data.y, data);
		this.victims[data.id] = victim;
		this.addActor(victim);
	},

	removeVictim: function (data) {
		var victim = this.victims[data.id];
		this.addActor(new splatterActor("blood" + data.id, victim.position.x, victim.position.y, data.splatter));
		this.removeActor(victim);
	},

	addPlayer: function (data) {
		var player = new otherCarActor("car" + data.playerId, data.x, data.y, Application.levelData.car);
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
			} else {
				this.players[playerPosition.playerId].body.SetPositionAndAngle({
					'x': playerPosition.x,
					'y': playerPosition.y
				}, gamvas.math.degToRad(playerPosition.angle));
			}
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

	postDraw: function(t) {
	},

	onMouseDown: function(b, x, y) {
	},

	onKeyDown: function(keyCode, character, ev) {
		switch (keyCode) {
			case gamvas.key.H:
				this.hornSound.play();
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

		// lazy load existing players
		for (var i in this.lazyPlayers) {
			this.addPlayer(this.lazyPlayers[i]);
		}

		handlerFactory.getHandler('Level').callGetPlayerPositions();
	}
});
