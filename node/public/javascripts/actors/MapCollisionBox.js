
mapCollisionBoxActor = gamvas.Actor.extend({
	// we add a extra parameter name file, which a normal gamvas.Actor does not have.
	// this is a little trick, so we can use the state wide resource handler to
	// load the image. see below.
	create: function(name, x, y, config) {
		// IMPORTANT! initialize our actor by calling the super class constructor
		this._super(name, x, y);
		this.config = config;
		this.collided = false;

		if (config.type == "rect") {
			this.bodyRect(this.position.x, this.position.y, config.width, config.height, gamvas.physics.STATIC);
		} else if (config.type == "circle") {
			this.bodyRect(this.position.x, this.position.y, config.radius, gamvas.physics.STATIC);
		}

	},

	onCollisionEnter: function(a) {
		if (!this.collided) {
			this.collided = true;
			console.log("i got hit by "+a.name);
		}
	}
});
