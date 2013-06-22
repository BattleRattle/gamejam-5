
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

		this.currentPosition = this.path.start.add(multiplyVec2D(this.path.direction, Math.random()));

		// normalized direction
		this.direction = Math.random() < 0.5 ? this.path.direction.normalized() : multiplyVec2D(this.path.direction, -1).normalized();


		this._super(name, this.currentPosition.x, this.currentPosition.y);
		this.config = config;
		this.collided = false;

		this.addAnimation(
			new gamvas.Animation('running', Application.images['default_victim'], 24, 24, 6, 9)
		);

		this.setAnimation("running");
		this.bodyRect(this.position.x, this.position.y, 25, 25, gamvas.physics.DYNAMIC);

		this.preDraw(0);
	},

	preDraw: function(t) {
		var SPEED = 40;

		this.currentPosition = this.currentPosition.add(multiplyVec2D(this.direction, SPEED * t));
//		if (this.currentPosition.subtract(this.path.start).length() > this.direction.length()) {
//			var subtract = this.currentPosition.subtract(this.path.start).length() - this.direction.length();
//			this.currentPosition = multiplyVec2D(this.currentPosition, subtract);
//			this.direction = multiplyVec2D(this.direction, -1);
//		}

		this.setPosition(this.currentPosition.x, this.currentPosition.y);
//		if(this.direction.x )


//		var worldForwardVec = this.body.GetWorldVector(new Box2D.Common.Math.b2Vec2(1, 0));
//		var worldDirVec = this.body.GetWorldVector(new Box2D.Common.Math.b2Vec2(this.direction.x, this.direction.y));
//		this.setRotation(Math.acos(worldDirVec.x) - Math.acos(worldForwardVec.x) + 0.5 * Math.PI);

		this.setRotation((this.direction.x === 0.0) ? Math.asin(this.direction.y) : Math.acos(this.direction.x));
	},

	onCollisionEnter: function(a) {
		if (!this.collided) {
			this.collided = true;
			handlerFactory.getHandler("Victim").callCollide(this.config);
			console.log("i got hit by "+a.name);
		}
	}
});
