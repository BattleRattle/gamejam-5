frontWheelActor = wheelActor.extend({
	getCharacteristics: function() {
		return {
			maxForwardSpeed: 250,
			maxBackwardSpeed: -40,
			maxDriveForce: 500,
			maxLateralImpulse: 7.5
		}
	}
});