levelScene = gamvas.State.extend({
	init: function() {
		console.log("level");
		this.dim = gamvas.getCanvasDimension();

		this.addActor(new carActor("car", 0, 0));

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
