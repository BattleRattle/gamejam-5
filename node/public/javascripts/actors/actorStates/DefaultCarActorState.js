// define our main actor state by extending gamvas.ActorState
defaultCarActorState = gamvas.ActorState.extend({
	init: function() {
		// define our local variables
		this.counter = 0;
	},

	// this is the actors brain, t is time in seconds since last thought
	update: function(t) {
		// count up PI per second, which means we will move
		// one second up, one second down, as 360 degrees is 2*Math.PI in
		// radians
		this.counter += Math.PI*t;

		// clamp our counter to 360 degrees aka 2*Math.PI in radians
		if (this.counter > 2*Math.PI) {
			this.counter -= 2*Math.PI;
		}


        if (gamvas.key.isPressed(gamvas.key.UP)) {
            //var velo = this.body.GetLinearVelocity();
            var velo = new Box2D.Common.Math.b2Vec2(0.5, 0.0);

            this.actor.body.SetLinearVelocity(velo);
        }


		// move our actor the sin value of counter, which gives him
		// a smooth circular motion
		//this.actor.move(0, -10*Math.sin(this.counter));
	}
});
