rearWheelActor = wheelActor.extend({
	getCharacteristics: function() {
		return {
			maxForwardSpeed: 250,
			maxBackwardSpeed: -40,
			maxDriveForce: 300,
			maxLateralImpulse: 8.5
		}
	},

	updateTurn: function() {
	}
});