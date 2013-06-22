
cityActor = gamvas.Actor.extend({
	// we add a extra parameter name file, which a normal gamvas.Actor does not have.
	// this is a little trick, so we can use the state wide resource handler to
	// load the image. see below.
	create: function(name, x, y, config) {
		// IMPORTANT! initialize our actor by calling the super class constructor
		this._super(name, x, y);

		// set the actors center point to its lower center
		this.setCenter(0,0);

		// finally add the state to our actor
		this.addState(new defaultCityActorState('default', config.map));

		// and switch to it (actors have a default state which does nothing)
		this.setState('default');

		var st = this.getCurrentState();
	}
});
