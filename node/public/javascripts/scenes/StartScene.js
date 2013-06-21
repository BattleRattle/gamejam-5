startScene = gamvas.State.extend({
	init: function() {
		console.log("start");
		this.dim = gamvas.getCanvasDimension();

        // assume our car (128px X 64px) is 4m X 2m
        gamvas.physics.pixelsPerMeter = 32;

        // we need no gravity for a top-down view
        var gravity = new gamvas.Vector2D(0, 0);
        gamvas.physics.setGravity(gravity);
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
		this.c.fillText("Violence suxx but we are awesome!", 0, 0);
	},

	postDraw: function(t) {
	},

	onMouseDown: function(b, x, y) {
	},

	// prevent browser scrolling on space
	onKeyDown: function(k) {
		gamvas.state.setState("level");
		return false;
	},

	// switch to rain state on space
	onKeyUp: function(k) {
		return false;
	}
});
