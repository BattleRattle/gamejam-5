
cityActor = gamvas.Actor.extend({
	// we add a extra parameter name file, which a normal gamvas.Actor does not have.
	// this is a little trick, so we can use the state wide resource handler to
	// load the image. see below.
	create: function(name, x, y) {
		// IMPORTANT! initialize our actor by calling the super class constructor
		this._super(name, x, y);

		// get the current state, so we can acsess its resource loader with st.resource
		var st = gamvas.state.getCurrentState();

		// use the resource loader set the Gamvas logo as its single image
		// every state has predefined variables, one of them is .resource, which is the resource handler

		// set the actors center point to its lower center
		this.setCenter(0,0);

		// finally add the state to our actor
		this.addState(new defaultCityActorState('default'));

		// and switch to it (actors have a default state which does nothing)
		this.setState('default');
	}
});