// define our main actor state by extending gamvas.ActorState
defaultCarActorState = gamvas.ActorState.extend({
	init: function() {
		// define our local variables
		this.counter = 0;
	},

	// this is the actors brain, t is time in seconds since last thought
	update: function(t) {
		if (gamvas.key.isPressed(gamvas.key.SPACE)) {
			Application.scenes['level'].addActor(new explosionEmitter("boom", this.actor.position.x, this.actor.position.y));
			Application.scenes['level'].removeActor(this.actor);
			return;
		}
		this.actor.calculatePhysics(t);
	}
});
