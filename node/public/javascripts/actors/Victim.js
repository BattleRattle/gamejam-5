
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

		this.setFile(Application.images['default_victim']);
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
