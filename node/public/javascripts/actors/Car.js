
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

        this.setLinearDamping(0.15);

		// finally add the state to our actor
		this.addState(new defaultCarActorState('default'));

		// and switch to it (actors have a default state which does nothing)
		this.setState('default');

	}
});
