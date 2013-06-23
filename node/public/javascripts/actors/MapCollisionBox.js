
mapCollisionBoxActor = gamvas.Actor.extend({
	// we add a extra parameter name file, which a normal gamvas.Actor does not have.
	// this is a little trick, so we can use the state wide resource handler to
	// load the image. see below.
	create: function(name, x, y, config) {
		// IMPORTANT! initialize our actor by calling the super class constructor
		this._super(name, x, y);
		this.config = config;

		if (config.type == "rect") {
			this.bodyRect(this.position.x + config.width / 2, this.position.y + config.height / 2, config.width, config.height, gamvas.physics.STATIC);
		} else if (config.type == "circle") {
			this.bodyRect(this.position.x + config.radius / 2, this.position.y + config.radius / 2, config.radius, gamvas.physics.STATIC);
		}

		this.setGroupIndex(-5);
	},

	onCollisionEnter: function(a) {
		console.log(this.name + " got hit by "+a.name);
	}
});
