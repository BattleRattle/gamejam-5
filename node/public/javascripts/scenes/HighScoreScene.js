highScoreScene = gamvas.State.extend({
	init: function() {
		this.dim = gamvas.getCanvasDimension();
		this.highscoreData = null;

	},

	enter: function () {
		handlerFactory.getHandler("HighScore").callGetHighScore();
	},

	setHighScoreData: function (data) {
		this.highscoreData = data;
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
		this.c.fillText("..:: Highscore ::..", 0, -200);
		if (this.highscoreData == null) {
			this.c.fillText("loading ...", 0, -150);
		} else {
			var minHeight = -150;
			var stepHeight = 50;
			for (var i = 0; i < this.highscoreData.length; i++, minHeight += stepHeight) {
				var data = this.highscoreData[i];
				this.c.fillText("" + (i + 1) + ". " + data.name + " :: " + data.points, 0, minHeight);
			}
		}
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
