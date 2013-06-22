
carActor = gamvas.Actor.extend({
	// we add a extra parameter name file, which a normal gamvas.Actor does not have.
	// this is a little trick, so we can use the state wide resource handler to
	// load the image. see below.
	create: function(name, x, y, file) {
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
        this.bodyRect(this.position.x, this.position.y, 48, 24, gamvas.physics.DYNAMIC);

		this.wheels = [
			new wheelActor("front_left", 0, 0, this),
			new wheelActor("front_right", 0, 0, this),
			new wheelActor("rear_left", 0, 0, this),
			new wheelActor("rear_right", 0, 0, this)
		];

		this.setAngularDamping(3);

		this.addRevoluteJoint(this.wheels[0], new gamvas.Vector2D(50, 30));
		this.addRevoluteJoint(this.wheels[1], new gamvas.Vector2D(50, -30));
		this.addRevoluteJoint(this.wheels[2], new gamvas.Vector2D(-50, 30));
		this.addRevoluteJoint(this.wheels[3], new gamvas.Vector2D(-50, -30));


		// finally add the state to our actor
		this.addState(new defaultCarActorState('default'));

		// and switch to it (actors have a default state which does nothing)
		this.setState('default');

	},

	calculatePhysics: function(t) {
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
