// define our main actor state by extending gamvas.ActorState
defaultCarActorState = gamvas.ActorState.extend({
	init: function() {
		// define our local variables
		this.counter = 0;
	},

	// this is the actors brain, t is time in seconds since last thought
	update: function(t) {

        var velo = this.actor.body.GetLinearVelocity();


        if (gamvas.key.isPressed(gamvas.key.DOWN))
            velo.y =  Math.min(2.0, velo.y + 0.1);
        else if (gamvas.key.isPressed(gamvas.key.UP))
            velo.y =  Math.max(-2.0, velo.y - 0.1)

        if (gamvas.key.isPressed(gamvas.key.RIGHT))
            velo.x =  Math.min(2.0, velo.x + 0.1);
        else if (gamvas.key.isPressed(gamvas.key.LEFT))
            velo.x =  Math.max(-2.0, velo.x - 0.1)

        this.actor.body.SetLinearVelocity(velo);

            //var velo = new Box2D.Common.Math.b2Vec2(0.5, 0.0);
            /*var forward = new Box2D.Common.Math.b2Vec2(1.0, 0.0);

            var currentForwardNormal = this.actor.body.GetWorldVector(forward);

            var relativeVelo = this.actor.body.GetLocalVector(
                this.actor.body.GetLinearVelocityFromLocalPoint(
                    new Box2D.Common.Math.b2Vec2(this.actor.position.x, this.actor.position.y)));*/
	}
});
