rearWheelActor = wheelActor.extend({
	getCharacteristics: function() {
		return {
			maxForwardSpeed: 100,
			maxBackwardSpeed: -20,
			maxDriveForce: 300,
			maxLateralImpulse: 8.5
		}
	}
});