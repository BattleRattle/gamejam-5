debugActor = gamvas.Actor.extend({
	init: function() {
		this.dim = gamvas.getCanvasDimension();

		var defaultState = gamvas.state.getCurrentState();

		// set the actors center point to its lower center
		//this.setCenter(0,0);

		defaultState.draw = function (t) {

			var fps = gamvas.screen.getFPS() + "/? FPS";
			var objects = gamvas.state.getCurrentState().getActors().length + " actors";
			this.c.fillStyle = '#ff69b4';
			// pick some nice font
			this.c.font = '12px sans-serif';
			// our text should be drawn centered
			this.c.textAlign = 'left';
			// draw the text (note that every state has a default
			// camera that points to position 0/0)
			var x = (- this.dim.w / 2) + 20;
			var y = (- this.dim.h / 2) + 30;
			this.c.fillText(fps, x, y);
			this.c.fillText(objects, x, y + 15);
		};

		defaultState.onMouseDown = function(b, x, y) {
			console.log("mouse down on x:", x, " y:", y);
		}
	}
});