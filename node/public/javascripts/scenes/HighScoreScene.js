highScoreScene = gamvas.State.extend({
	init: function() {
		console.log("high score");
		this.dim = gamvas.getCanvasDimension();

		// assume our car (128px X 64px) is 4m X 2m
		gamvas.physics.pixelsPerMeter = 32;
	},


	draw: function(t) {
		// every state has this.c, which is the 2D context of the canvas
		// set our draw color to white
		this.c.fillStyle = '#fff';
		// pick some nice font
		this.c.font = 'bold 20px sans-serif';
		// our text should be drawn centered
		this.c.textAlign = 'center';
		// draw the text (note that every state has a default
		// camera that points to position 0/0)
		this.c.fillText("Highscore!", 0, -200);
		this.c.fillText("1. Captain Awesome - 10'000", 0, -150);
		this.c.fillText("2. Major Awesome - 1'000", 0, -100);
		this.c.fillText("3. Master Awesome - 100", 0, -50);
	},

	postDraw: function(t) {
	},

	onMouseDown: function(b, x, y) {
	},

	// prevent browser scrolling on space
	onKeyDown: function(k) {
		gamvas.state.setState("start");
		return false;
	},

	// switch to rain state on space
	onKeyUp: function(k) {
		return false;
	}
});
