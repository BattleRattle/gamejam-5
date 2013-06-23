
bombActor = gamvas.Actor.extend({
	// we add a extra parameter name file, which a normal gamvas.Actor does not have.
	// this is a little trick, so we can use the state wide resource handler to
	// load the image. see below.
	create: function(name, x, y, config) {
		this.layer = 1;
		// IMPORTANT! initialize our actor by calling the super class constructor
		this._super(name, x, y);

		// get the current state, so we can acsess its resource loader with st.resource
		var st = gamvas.state.getCurrentState();

		// use the resource loader set the Gamvas logo as its single image
		// every state has predefined variables, one of them is .resource, which is the resource handler
		var imagePath = 'images/dynamite.png';
		if (typeof Application.images[imagePath] == "undefined") {
			Application.images[imagePath] = st.resource.getImage(imagePath);
		}
		this.setFile(Application.images[imagePath]);

		var that = this;
		setTimeout(function() {
			that.explode(that.position.x, that.position.y, config);
		}, config.timeout);

	},

	explode: function (x, y, config) {
		Application.scenes['level'].addActor(new explosionEmitter("boom", x, y, config.size));
		setTimeout(function () {
			var boom = new explosionCollisionActor("boom - kabooom", x, y, config.size);
			Application.scenes['level'].addActor(boom);

			setTimeout(function() {
				Application.scenes['level'].removeActor(boom);
			}, 20);
		}, 100);


		Application.scenes['level'].removeActor(this);
	}

});
