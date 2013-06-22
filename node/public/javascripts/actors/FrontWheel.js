frontWheelActor = wheelActor.extend({
	getCharacteristics: function() {
		return {
			maxForwardSpeed: 100,
			maxBackwardSpeed: -20,
			maxDriveForce: 500,
			maxLateralImpulse: 7.5
		}
	}
});