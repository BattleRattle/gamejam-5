
splatterActor = gamvas.Actor.extend({
	// we add a extra parameter name file, which a normal gamvas.Actor does not have.
	// this is a little trick, so we can use the state wide resource handler to
	// load the image. see below.
	create: function(name, x, y, config) {
		console.log(config)
		// IMPORTANT! initialize our actor by calling the super class constructor
		this._super(name, x + config.offset.x, y + config.offset.y);

		// get the current state, so we can acsess its resource loader with st.resource
		var st = gamvas.state.getCurrentState();

		// use the resource loader set the Gamvas logo as its single image
		// every state has predefined variables, one of them is .resource, which is the resource handler
		var imagePath = 'images/splatter/' + config.image;
		if (typeof Application.images[imagePath] == "undefined") {
			Application.images[imagePath] = st.resource.getImage(imagePath);
		}
		this.setFile(Application.images[imagePath]);


	}
});
