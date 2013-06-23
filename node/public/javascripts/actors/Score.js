scoreActor = gamvas.Actor.extend({
	init: function() {
		this.score = 0;
		this.kills = 0;

		this.dim = gamvas.getCanvasDimension();
		this.c = gamvas.getContext2D();

		this.addState(new defaultScoreActorState('default'));
		this.setState('default');
	},

	setScore: function (data) {
		this.score = data.score;
		this.kills = data.kills;
	},

	draw: function (t) {
		this.layer = 100;
		this.c.fillStyle = '#ff69b4';
		// pick some nice font
		this.c.font = '16px sans-serif';
		// our text should be drawn centered
		this.c.textAlign = 'right';
		// draw the text (note that every state has a default
		// camera that points to position 0/0)
		var cam = Application.scenes['level'].camera;
		var x = cam.position.x + (this.dim.w / 2) / cam.zoomFactor - 50;
		var y = cam.position.y + (- this.dim.h / 2) / cam.zoomFactor + 30;

		this.c.fillText("Score: " + this.score, x, y);
		this.c.fillText("Kills: " + this.kills, x, y + 20);
	}

});
