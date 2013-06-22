// define our main actor state by extending gamvas.ActorState
defaultCarActorState = gamvas.ActorState.extend({
	init: function() {
		// define our local variables
		this.counter = 0;
	},

	// this is the actors brain, t is time in seconds since last thought
	update: function(t) {
		this.actor.calculatePhysics(t);
	}
});
