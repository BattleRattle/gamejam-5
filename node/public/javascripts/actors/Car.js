
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
		this.setFile(st.resource.getImage('images/cars/green.png'));

        // a car is a moving object
        this.bodyRect(this.position.x, this.position.y, config.collisionBox.width, config.collisionBox.height, gamvas.physics.DYNAMIC);

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

/*		var massData = new Box2D.Collision.Shapes.b2MassData();
		massData.mass = 50;
		massData.I = 50;
		massData.center.x = 0;
		massData.center.y = 0;
		this.body.SetMassData(massData);*/


		this.flJoint = this.addRevoluteJoint(this.wheels[0], new gamvas.Vector2D(gamvas.physics.toWorld(27), gamvas.physics.toWorld(-22)), {lowerAngle:0, upperAngle:0, enableLimit:true, enableMotor:false});
		this.frJoint = this.addRevoluteJoint(this.wheels[1], new gamvas.Vector2D(gamvas.physics.toWorld(27), gamvas.physics.toWorld(22)), {lowerAngle:0, upperAngle:0, enableLimit:true, enableMotor:false});
		this.addRevoluteJoint(this.wheels[2], new gamvas.Vector2D(gamvas.physics.toWorld(-27), gamvas.physics.toWorld(-22)), {lowerAngle:0, upperAngle:0, enableLimit:true, enableMotor:false});
		this.addRevoluteJoint(this.wheels[3], new gamvas.Vector2D(gamvas.physics.toWorld(-27), gamvas.physics.toWorld(22)), {lowerAngle:0, upperAngle:0, enableLimit:true, enableMotor:false});

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
	},

	calculatePhysics: function(t) {
		gamvas.physics.getWorld().ClearForces();

		var lockAngle = gamvas.math.degToRad(35);
		var turnSpeedPerSec = gamvas.math.degToRad(320);
		var turnPerTimeStep = turnSpeedPerSec / 60;

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
	}

});
