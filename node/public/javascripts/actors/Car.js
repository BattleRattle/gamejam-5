carActor = gamvas.Actor.extend({
	// we add a extra parameter name file, which a normal gamvas.Actor does not have.
	// this is a little trick, so we can use the state wide resource handler to
	// load the image. see below.
	create: function(name, x, y, config) {
		// IMPORTANT! initialize our actor by calling the super class constructor
		this._super(name, x, y);

		// get the current state, so we can acsess its resource loader with st.resource
		var st = gamvas.state.getCurrentState();

		// use the resource loader set the Gamvas logo as its single image
		// every state has predefined variables, one of them is .resource, which is the resource handler
		this.setFile(st.resource.getImage('images/cars/' + config.image));
		this.explosionSound = new gamvas.Sound(st.resource.getSound("/sounds/explosion-2.wav"));

		// a car is a moving object
		this.position.y -= 250;
		this.layer = 5;

		this.bodyPolygon(this.position.x, this.position.y, config.collisionBox.polys, config.collisionBox.cx, config.collisionBox.cy, gamvas.physics.DYNAMIC);

		this.wheels = [
			new frontWheelActor("front_left", 27, -21 - 250, this),
			new frontWheelActor("front_right", 27, 21 - 250, this),
			new rearWheelActor("rear_left", -27, -21 - 250, this),
			new rearWheelActor("rear_right", -27, 21 - 250, this)
		];

		this.restitution = 0.1; // bounce
		this.density = 0.3;
		this.setAngularDamping(10);
		this.setLinearDamping(6);

		this.MAX_HEALTH = 1000;

		this.health = 1000;

		this.flJoint = this.addRevoluteJoint(this.wheels[0], new gamvas.Vector2D(gamvas.physics.toWorld(27), gamvas.physics.toWorld(-20 - 250)), {lowerAngle: 0, upperAngle: 0, enableLimit: true, enableMotor: false});
		this.frJoint = this.addRevoluteJoint(this.wheels[1], new gamvas.Vector2D(gamvas.physics.toWorld(27), gamvas.physics.toWorld(20 - 250)), {lowerAngle: 0, upperAngle: 0, enableLimit: true, enableMotor: false});
		this.addRevoluteJoint(this.wheels[2], new gamvas.Vector2D(gamvas.physics.toWorld(-27), gamvas.physics.toWorld(-20 - 250)), {lowerAngle: 0, upperAngle: 0, enableLimit: true, enableMotor: false});
		this.addRevoluteJoint(this.wheels[3], new gamvas.Vector2D(gamvas.physics.toWorld(-27), gamvas.physics.toWorld(20 - 250)), {lowerAngle: 0, upperAngle: 0, enableLimit: true, enableMotor: false});

		// finally add the state to our actor
		this.addState(new defaultCarActorState('default'));

		// and switch to it (actors have a default state which does nothing)
		this.setState('default');

		this.handler = handlerFactory.getHandler('Player');
		this.lastPosition = {
			'x': 0,
			'y': 0
		};
		this.updateEveryMilliSeconds = 1000 / 10;
		this.lastUpdateTime = 0;
		this.sparks = new sparkEmitter("carDamageSparks", this.position.x, this.position.y);
		this.smoke = new smokeEmitter("carDamageSmoke", this.position.x, this.position.y);
		this.darkSmoke = new darkSmokeEmitter("carDamageDarkSmoke", this.position.x, this.position.y);
	},

	calculatePhysics: function(t) {
		gamvas.physics.getWorld().ClearForces();

		var lockAngle = gamvas.math.degToRad(35);
		var turnSpeedPerSec = gamvas.math.degToRad(320);
		var turnPerTimeStep = turnSpeedPerSec / 30;

		var desiredAngle = 0;
		if (gamvas.key.isPressed(gamvas.key.LEFT)) {
			desiredAngle = -lockAngle;
		} else if (gamvas.key.isPressed(gamvas.key.RIGHT)) {
			desiredAngle = lockAngle;
		}

		var angleNow = this.flJoint.GetJointAngle();
		var angleToTurn = desiredAngle - angleNow;

		angleToTurn = Box2D.Common.Math.b2Math.Clamp(angleToTurn, -turnPerTimeStep, turnPerTimeStep);
		var newAngle = angleNow + angleToTurn;
		this.flJoint.SetLimits(newAngle, newAngle);
		this.frJoint.SetLimits(newAngle, newAngle);

		this.wheels.forEach(function(wheel) {
			wheel.calculatePhysics(t);
		});

		this.updateServer(t);
	},

	onCollision: function(a, ni) {

        if(a.name === "boom - kabooom"){
            this.health -= 15;
            return;
        }
		if (ni > 20) {
			this.health -= ni * 0.1;
		}
	},

	drawDamage: function(t) {
		if (this.health < 0.0) {
			this.explosionSound.play();
			this.removeActor(this, this.position.x, this.position.y);

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
		this.drawDamage(t)
	},

	getForwardVelocity: function() {
		if (!this.body) {
			return 0;
		}

		var currentForwardNormal = this.body.GetWorldVector(new Box2D.Common.Math.b2Vec2(1, 0));
		return multiplyVec2D(currentForwardNormal, Box2D.Common.Math.b2Math.Dot(currentForwardNormal, this.body.GetLinearVelocity())).Length();
	},

	updateServer: function(t) {
		// prevent client from spamming server
		this.lastUpdateTime += t * 1000;
		if (this.lastUpdateTime < this.updateEveryMilliSeconds) {
			return;
		}
		this.lastUpdateTime = 0;

		var changed = false;
		var xPosition = Math.round(this.body.GetPosition().x * 100) / 100;
		var yPosition = Math.round(this.body.GetPosition().y * 100) / 100;

		if (this.lastPosition.x !== xPosition) {
			this.lastPosition.x = xPosition;
			changed = true;
		}
		if (this.lastPosition.y !== yPosition) {
			this.lastPosition.y = yPosition;
			changed = true;
		}

		if (changed) {
			this.handler.callUpdatePosition({
				'x': xPosition,
				'y': yPosition,
				'angle': Math.round(gamvas.math.radToDeg(this.body.GetAngle()))
			});
		}
	},

	removeActor: function(elem, x, y) {
		Application.scenes['level'].addActor(new explosionEmitter("boom", x, y, 10));
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

		handlerFactory.getHandler('Player').callLetMeDie({
			'x': x,
			'y': y
		});
	}

});
