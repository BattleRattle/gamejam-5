levelScene = gamvas.State.extend({
	init: function() {
		this.victims = [];

		this.dim = gamvas.getCanvasDimension();

        gamvas.physics.resetWorld(0, 0, false);

		this.addActor(new cityActor("city", 0, 0, Application.levelData));
		this.addActor(this.carActor = new carActor("car", 0, 0, Application.levelData.car));

		if (gamvas.config.debug) {
			this.addActor(new debugActor("debug"));
		}
	},

	addVictim: function (data) {
		var victim = new victimActor("victim" + data.id, data.x, data.y, data);
		this.victims[data.id] = victim;
		this.addActor(victim);
	},

	removeVictim: function (data) {
		this.removeActor(this.victims[data.id]);

	},

	preDraw: function(t) {
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
	}
});
