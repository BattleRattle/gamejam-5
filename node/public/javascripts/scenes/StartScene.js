startScene = gamvas.State.extend({
	init: function() {
		this.dim = gamvas.getCanvasDimension();

        // assume our car (96px X 48px) is 4m X 2m
        gamvas.physics.pixelsPerMeter = 24;

		this.logo= new gamvas.Image(this.resource.getImage("/images/startup/logo.png"));
		this.palms = new gamvas.Image(this.resource.getImage("/images/startup/palm.png"));
		this.textOpacity = 1.0;
		this.textOpacityDiff = -1;
	},

	preDraw: function(t) {
		var gradient = this.c.createLinearGradient(0, 0, 0, this.dim.h);
		gradient.addColorStop(0, '#ffbffa');
		gradient.addColorStop(1, '#ff51dc');
		this.c.fillStyle = gradient;
		this.c.fillRect(0, 0, this.dim.w, this.dim.h);

		this.logo.setPosition(this.dim.w / 2 - 672, this.dim.h / 2 - 231);
		this.logo.draw();

		this.palms.setPosition(this.dim.w - 794, this.dim.h - 621);
		this.palms.draw();

		this.textOpacity += this.textOpacityDiff * t;
		if (this.textOpacity >= 1.0) {
			this.textOpacity = 1.0;
			this.textOpacityDiff = -1;
		} else if (this.textOpacity < 0.2) {
			this.textOpacity = 0.2;
			this.textOpacityDiff = 1;
		}

		this.c.fillStyle = 'rgba(255,255,255,' + this.textOpacity + ')';
		this.c.font = 'bold 30px sans-serif';
		this.c.textAlign = 'center';
		this.c.fillText("PRESS ANY KEY TO START THE GAME!", this.dim.w / 2, this.dim.h - 100);
//		this.c.fillText("Violence suxx but we are awesome!", 0, 0);
	},

	postDraw: function(t) {
	},

	onMouseDown: function(b, x, y) {
	},

	// prevent browser scrolling on space
	onKeyDown: function(k) {
		if (k == 72) {
			gamvas.state.setState("high_score");
		} else {
			gamvas.state.setState("level");
		}

		return false;
	},

	// switch to rain state on space
	onKeyUp: function(k) {
		return false;
	}
});
