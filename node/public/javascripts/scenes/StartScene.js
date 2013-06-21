startScene = gamvas.State.extend({
	init: function() {
		console.log("start");
		this.dim = gamvas.getCanvasDimension();
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
