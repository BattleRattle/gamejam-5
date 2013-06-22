
wheelActor = gamvas.Actor.extend({
	create: function(name, x, y, carActor) {
		// IMPORTANT! initialize our actor by calling the super class constructor
		this._super(name, x, y);

		// get the current state, so we can acsess its resource loader with st.resource
		var st = gamvas.state.getCurrentState();

		// hold reference of car actor
		this.carActor = carActor;

		// use the resource loader set the Gamvas logo as its single image
		// every state has predefined variables, one of them is .resource, which is the resource handler
		this.setFile(st.resource.getImage('images/wheel.png'));

		// set the actors center point to its lower center
		//this.setCenter(64,32);

		// a wheel is a moving object
		this.bodyRect(this.position.x, this.position.y, 8, 2, gamvas.physics.DYNAMIC);

		this.setLinearDamping(0.15);

		// finally add the state to our actor
		this.addState(new defaultCarActorState('default'));

		// and switch to it (actors have a default state which does nothing)
		this.setState('default');

	},

	calculatePhysics: function(t) {
		this.updateFriction();
		this.updateDrive();
		this.updateTurn();
	},

	getForwardVelocity: function() {
		var currentForwardNormal = this.body.GetWorldVector(new Box2D.Common.Math.b2Vec2(1, 0));
		return multiplyVec2D(currentForwardNormal, Box2D.Common.Math.b2Math.Dot(currentForwardNormal, this.body.GetLinearVelocity()));
	},

	getLateralVelocity: function() {
		var currentRightNormal = this.body.GetWorldVector(new Box2D.Common.Math.b2Vec2(0, 1));
		return multiplyVec2D(currentRightNormal, Box2D.Common.Math.b2Math.Dot(currentRightNormal, this.body.GetLinearVelocity()));
	},

	updateFriction: function() {
		var MAX_LATERAL_IMPULSE = 8.0;

		var impulse = multiplyVec2D(this.getLateralVelocity(), -this.body.GetMass());
		if (impulse.Length() > MAX_LATERAL_IMPULSE) {
			impulse = multiplyVec2D(impulse, MAX_LATERAL_IMPULSE / impulse.Length());
		}
		this.body.ApplyImpulse(impulse, this.body.GetWorldCenter());

		this.body.ApplyAngularImpulse(0.1 * this.body.GetInertia() * -this.body.GetAngularVelocity()); // FLOAT!!!
		var currentForwardNormal = this.getForwardVelocity();

		var currentForwardSpeed = currentForwardNormal.Normalize(); // FLOAT!!!1111
		var dragForceMagnitude = -2 * currentForwardSpeed;
		this.body.ApplyForce(multiplyVec2D(currentForwardNormal, dragForceMagnitude), this.body.GetWorldCenter());
	},

	updateDrive: function() {
		var MAX_FORWARD_SPEED = 100;
		var MAX_BACKWARD_SPEED = -20;
		var MAX_DRIVE_FORCE = 150;

		var desiredSpeed = 0;
		if (gamvas.key.isPressed(gamvas.key.UP)) {
			desiredSpeed = MAX_FORWARD_SPEED;
		} else if (gamvas.key.isPressed(gamvas.key.DOWN)) {
			desiredSpeed = MAX_BACKWARD_SPEED;
		} else {
			return;
		}

		var currentForwardNormal = this.body.GetWorldVector(new Box2D.Common.Math.b2Vec2(1, 0));
		var currentSpeed = Box2D.Common.Math.b2Math.Dot(this.getForwardVelocity(), currentForwardNormal);

		var force = 0;
		if (desiredSpeed > currentSpeed) {
			force = MAX_DRIVE_FORCE;
		} else if (desiredSpeed < currentSpeed) {
			force = -MAX_DRIVE_FORCE;
		} else {
			return;
		}

		this.body.ApplyForce(multiplyVec2D(currentForwardNormal, force), this.body.GetWorldCenter());
	},

	updateTurn: function() {
		var desiredTorque = 0;

		if (gamvas.key.isPressed(gamvas.key.LEFT)) {
			desiredTorque = 15;
		} else if (gamvas.key.isPressed(gamvas.key.RIGHT)) {
			desiredTorque = -15;
		}

		this.body.ApplyTorque(desiredTorque);
	}
});
