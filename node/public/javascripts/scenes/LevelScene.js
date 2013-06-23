levelScene = gamvas.State.extend({
	init: function() {
		gamvas.physics.resetWorld(0, 0, false);
	},

	addVictim: function (data) {
		if (this.init && this.victims) {
			var victim = new victimActor("victim" + data.id, data.x, data.y, data);
			this.victims[data.id] = victim;
			this.addActor(victim);
		}
	},

	removeVictim: function (data) {
		var victim = this.victims[data.id];
		this.addActor(new splatterActor("blood" + data.id, victim.position.x, victim.position.y, data.splatter));
		this.removeActor(victim);

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

	// prevent browser scrolling on space
	onKeyDown: function(k) {
		return false;
	},

	// switch to rain state on space
	onKeyUp: function(k) {
		return false;
	},

	leave: function () {
		gamvas.physics.resetWorld(0, 0, false);
	},

	enter: function() {
		this.victims = [];

		this.dim = gamvas.getCanvasDimension();

		this.addActor(new cityActor("city", 0, 0, Application.levelData));
		this.addActor(this.carActor = new carActor("car", 0, 0, Application.levelData.car));
		this.addActor(this.score = new scoreActor("score", 0, 0));

		if (gamvas.config.debug) {
			this.addActor(new debugActor("debug"));
		}

		this.init = true;
	}
});
