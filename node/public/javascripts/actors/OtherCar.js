otherCarActor = gamvas.Actor.extend({
	// we add a extra parameter name file, which a normal gamvas.Actor does not have.
	// this is a little trick, so we can use the state wide resource handler to
	// load the image. see below.
	create: function(name, x, y, config) {
		// IMPORTANT! initialize our actor by calling the super class constructor
		this._super(name, x, y);

		// get the current state, so we can acsess its resource loader with st.resource
		var st = gamvas.state.getCurrentState();

		this.explosionSound = new gamvas.Sound(st.resource.getSound("/sounds/explosion-2.wav"));

		// use the resource loader set the Gamvas logo as its single image
		// every state has predefined variables, one of them is .resource, whic h is the resource handler
		this.setFile(st.resource.getImage('images/cars/green.png'));

		// a car is a moving object
		this.bodyPolygon(this.position.x, this.position.y, config.collisionBox.polys, config.collisionBox.cx, config.collisionBox.cy, gamvas.physics.DYNAMIC);

		this.wheels = [
			new frontWheelActor("front_left", 27, -23, this),
			new frontWheelActor("front_right", 27, 23, this),
			new rearWheelActor("rear_left", -27, -23, this),
			new rearWheelActor("rear_right", -27, 23, this)
		];

		this.restitution = 0.1; // bounce
		this.density = 0.3;
		this.setAngularDamping(10);
		this.setLinearDamping(6);

		this.MAX_HEALTH = 1000;

		this.health = 1000;

		this.flJoint = this.addRevoluteJoint(this.wheels[0], new gamvas.Vector2D(gamvas.physics.toWorld(27), gamvas.physics.toWorld(-22)), {lowerAngle: 0, upperAngle: 0, enableLimit: true, enableMotor: false});
		this.frJoint = this.addRevoluteJoint(this.wheels[1], new gamvas.Vector2D(gamvas.physics.toWorld(27), gamvas.physics.toWorld(22)), {lowerAngle: 0, upperAngle: 0, enableLimit: true, enableMotor: false});
		this.addRevoluteJoint(this.wheels[2], new gamvas.Vector2D(gamvas.physics.toWorld(-27), gamvas.physics.toWorld(-22)), {lowerAngle: 0, upperAngle: 0, enableLimit: true, enableMotor: false});
		this.addRevoluteJoint(this.wheels[3], new gamvas.Vector2D(gamvas.physics.toWorld(-27), gamvas.physics.toWorld(22)), {lowerAngle: 0, upperAngle: 0, enableLimit: true, enableMotor: false});

		// and switch to it (actors have a default state which does nothing)
		this.setState('default');

		this.sparks = new sparkEmitter("carDamageSparks", this.position.x, this.position.y);
		this.smoke = new smokeEmitter("carDamageSmoke", this.position.x, this.position.y);
		this.darkSmoke = new darkSmokeEmitter("carDamageDarkSmoke", this.position.x, this.position.y);
	},

	drawDamage: function(t) {
		if (this.health < 0.0) {
			this.explosionSound.play();

			Application.scenes['level'].addActor(new explosionEmitter("boom", this.position.x, this.position.y));
			Application.scenes['level'].removeActor(this);

			return;
		}

		if (this.health < this.MAX_HEALTH * 0.2) {
			this.sparks.setPosition(this.position.x, this.position.y);

			var worldForwardVec = this.body.GetWorldVector(new Box2D.Common.Math.b2Vec2(1, 0));
			this.sparks.setRotation(Math.acos(worldForwardVec.x) * Math.PI * 1.5);
			this.sparks.draw(t);
			return;
		}

		if (this.health < this.MAX_HEALTH * 0.5) {
			this.darkSmoke.setPosition(this.position.x, this.position.y);

			var worldForwardVec = this.body.GetWorldVector(new Box2D.Common.Math.b2Vec2(1, 0));
			this.darkSmoke.setRotation(Math.acos(worldForwardVec.x) * Math.PI * 1.5);
			this.darkSmoke.draw(t);
			return;
		}

		if (this.health < this.MAX_HEALTH * 0.833) {
			this.smoke.setPosition(this.position.x, this.position.y);

			var worldForwardVec = this.body.GetWorldVector(new Box2D.Common.Math.b2Vec2(1, 0));
			this.smoke.setRotation(Math.acos(worldForwardVec.x) * Math.PI * 1.5);
			this.smoke.draw(t);
			return;
		}
	},

	draw: function(t) {
		this.wheels.forEach(function(wheel) {
			wheel.draw(t);
		});
		this._super(t);
		this.drawDamage(t);
	},

	removeActor: function(elem, x, y) {
		var explosion = new explosionEmitter("boom", x, y, 10);

		Application.scenes['level'].addActor(explosion);
		setTimeout(function () {
			var boom = new explosionCollisionActor("boom - kabooom", x, y, 10);
			Application.scenes['level'].addActor(boom);

			setTimeout(function() {
				Application.scenes['level'].removeActor(boom);
			}, 100);
		}, 100);


		Application.scenes['level'].removeActor(elem);
		setTimeout(function() {
			Application.scenes['level'].addActor(new groundZeroActor("zero", x, y));
		}, 300);
	}

});
