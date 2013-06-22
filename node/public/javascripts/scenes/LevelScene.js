levelScene = gamvas.State.extend({
	init: function() {
		console.log(Application.levelData);
		this.dim = gamvas.getCanvasDimension();

        gamvas.physics.resetWorld(0, 0, false);

		this.addActor(new cityActor("city", 0, 0, Application.levelData));
		this.addActor(new carActor("car", 0, 0, Application.levelData.car));

		if (gamvas.config.debug) {
			this.addActor(new debugActor("debug"));
		}
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
