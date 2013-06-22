
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

		// set the actors center point to its lower center
		//this.setCenter(64,32);

        // a car is a moving object
        this.bodyRect(this.position.x, this.position.y, config.collisionBox.width, config.collisionBox.height, gamvas.physics.DYNAMIC);

        this.wheels = [
            new frontWheelActor("front_left", 25, -23, this),
            new frontWheelActor("front_right", 25, 23, this),
            new rearWheelActor("rear_left", -26, -23, this),
            new rearWheelActor("rear_right", -26, 23, this)
        ];

		this.setAngularDamping(3);

		var massData = new Box2D.Collision.Shapes.b2MassData();
		massData.mass = 1500;
		massData.I = 0;
		massData.center.x = 0;
		massData.center.y = 0;
		this.body.SetMassData(massData);


		this.flJoint = this.addRevoluteJoint(this.wheels[0], new gamvas.Vector2D(gamvas.physics.toWorld(25), gamvas.physics.toWorld(-20)), {lowerAngle:0, upperAngle:0, enableLimit:true, enableMotor:false});
		this.frJoint = this.addRevoluteJoint(this.wheels[1], new gamvas.Vector2D(gamvas.physics.toWorld(25), gamvas.physics.toWorld(20)), {lowerAngle:0, upperAngle:0, enableLimit:true, enableMotor:false});
		this.addRevoluteJoint(this.wheels[2], new gamvas.Vector2D(gamvas.physics.toWorld(-26), gamvas.physics.toWorld(-20)), {lowerAngle:0, upperAngle:0, enableLimit:true, enableMotor:false});
		this.addRevoluteJoint(this.wheels[3], new gamvas.Vector2D(gamvas.physics.toWorld(-26), gamvas.physics.toWorld(20)), {lowerAngle:0, upperAngle:0, enableLimit:true, enableMotor:false});

		// finally add the state to our actor
		this.addState(new defaultCarActorState('default'));

		// and switch to it (actors have a default state which does nothing)
		this.setState('default');

	},

	calculatePhysics: function(t) {
		var lockAngle = gamvas.math.degToRad(35);
		var turnSpeedPerSec = gamvas.math.degToRad(160);
		var turnPerTimeStep = turnSpeedPerSec * 1000 / t;

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

		//var velo = new Box2D.Common.Math.b2Vec2(0.5, 0.0);
		/*var forward = new Box2D.Common.Math.b2Vec2(1.0, 0.0);

		 var currentForwardNormal = this.actor.body.GetWorldVector(forward);

		 var relativeVelo = this.actor.body.GetLocalVector(
		 this.actor.body.GetLinearVelocityFromLocalPoint(
		 new Box2D.Common.Math.b2Vec2(this.actor.position.x, this.actor.position.y)));*/
	}
});
