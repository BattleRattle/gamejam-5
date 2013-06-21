var ObstacleEventHandler = require('./EventHandlers/ObstacleEventHandler');

var ConnectionEventFactory = function() {

	this.eventHandlers = {};

}

ConnectionEventFactory.prototype.getEventHandler = function(remoteClass) {
	if (this.eventHandlers[remoteClass]) {
		return this.eventHandlers[remoteClass];
	}

	switch (remoteClass) {
		case 'Obstacle':
			this.eventHandlers[remoteClass] = new ObstacleEventHandler();
			break;

		default:
			throw new Error('event handler is not implemented: ' + remoteClass);
	}

	return this.eventHandlers[remoteClass];
}

module.exports = ConnectionEventFactory;
