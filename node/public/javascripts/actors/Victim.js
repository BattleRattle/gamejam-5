
victimActor = gamvas.Actor.extend({
	// we add a extra parameter name file, which a normal gamvas.Actor does not have.
	// this is a little trick, so we can use the state wide resource handler to
	// load the image. see below.
	create: function(name, x, y, config) {
		// IMPORTANT! initialize our actor by calling the super class constructor
		this.path = {
			start: new gamvas.Vector2D(config.path.start.x, config.path.start.y),
			direction: new gamvas.Vector2D(config.path.end.x - config.path.start.x, config.path.end.y - config.path.start.y)
		};

		this.currentPosition = this.path.start;
		this.direction = this.path.direction.normalized();
		this.goBack = false;

		this._super(name, this.currentPosition.x, this.currentPosition.y);
		this.config = config;
		this.collided = false;

		var st = gamvas.state.getCurrentState();
		var imagePath = 'images/victims/' + config.data.image;
		if (typeof Application.images[imagePath] == "undefined") {
			Application.images[imagePath] = st.resource.getImage(imagePath);
		}

		this.addAnimation(
			new gamvas.Animation('running', Application.images[imagePath], 24, 24, 6, 9)
		);

		this.setAnimation("running");
		this.bodyRect(this.position.x, this.position.y, 25, 25, gamvas.physics.DYNAMIC);

		this.preDraw(0);
		this.setGroupIndex(-1);
	},

	preDraw: function(t) {
		var SPEED = this.config.data.speed;

		this.currentPosition = this.currentPosition.add(multiplyVec2D(this.direction, SPEED * t));
		var runLength = this.currentPosition.subtract(this.path.start).length();
		if (runLength > this.path.direction.length()) {
			this.currentPosition = this.path.start.add(this.path.direction);
			this.direction = multiplyVec2D(this.direction, -1);
			this.goBack = true;
		} else if (runLength < 2 && this.goBack) {
			this.direction = multiplyVec2D(this.direction, -1);
			this.goBack = false;
		}

		this.setPosition(this.currentPosition.x, this.currentPosition.y);
		this.setRotation((this.direction.x === 0.0) ? Math.asin(this.direction.y) : Math.acos(this.direction.x));
	},

	onCollisionEnter: function(a) {
		if (!this.collided && a.name == "car") {
			this.collided = true;
			handlerFactory.getHandler("Victim").callCollide(this.config);
			console.log("i got hit by "+a.name);
		}
	}
});
