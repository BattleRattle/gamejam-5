
explosionCollisionActor = gamvas.Actor.extend({
	// we add a extra parameter name file, which a normal gamvas.Actor does not have.
	// this is a little trick, so we can use the state wide resource handler to
	// load the image. see below.
	create: function(name, x, y, size) {
		// IMPORTANT! initialize our actor by calling the super class constructor
		this._super(name, x, y);

		this.bodyCircle(x, y, 14 * size, gamvas.physics.DYNAMIC);
	}
});
