
victimActor = gamvas.Actor.extend({
	// we add a extra parameter name file, which a normal gamvas.Actor does not have.
	// this is a little trick, so we can use the state wide resource handler to
	// load the image. see below.
	create: function(name, x, y, config) {
		// IMPORTANT! initialize our actor by calling the super class constructor
		this._super(name, x, y);
		this.config = config;
		this.collided = false;

		//this.bodyRect(this.position.x, this.position.y, 25);

		// get the current state, so we can acsess its resource loader with st.resource
		var st = gamvas.state.getCurrentState();

		// use the resource loader set the Gamvas logo as its single image
		// every state has predefined variables, one of them is .resource, which is the resource handler
		this.setFile(st.resource.getImage('images/victims/default.png'));

		this.bodyRect(this.position.x, this.position.y, 25, 25, gamvas.physics.STATIC);
	},

	onCollisionEnter: function(a) {
		if (!this.collided) {
			this.collided = true;
			handlerFactory.getHandler("Victim").callCollide({id: this.config.id});
			console.log("i got hit by "+a.name);
		}
	}
});
