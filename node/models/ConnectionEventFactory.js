var ObstacleEventHandler = require('./EventHandlers/ObstacleEventHandler'),
	HighScoreEventHandler = require('./EventHandlers/HighScoreEventHandler'),
	VictimEventHandler = require('./EventHandlers/VictimEventHandler'),
	LevelEventHandler = require('./EventHandlers/LevelEventHandler.js'),
	PlayerEventHandler = require('./EventHandlers/PlayerEventHandler.js');

var ConnectionEventFactory = function(connectionHandler) {

	this.connectionHandler = connectionHandler;
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

		case HighScoreEventHandler.CLASS_NAME:
			this.eventHandlers[remoteClass] = new HighScoreEventHandler();
			break;

		case VictimEventHandler.CLASS_NAME:
			this.eventHandlers[remoteClass] = new VictimEventHandler();
			break;

		case LevelEventHandler.CLASS_NAME:
			this.eventHandlers[remoteClass] = new LevelEventHandler();
			break;

		case PlayerEventHandler.CLASS_NAME:
			this.eventHandlers[remoteClass] = new PlayerEventHandler();
			break;

		default:
			throw new Error('event handler is not implemented: ' + remoteClass);
	}

	this.eventHandlers[remoteClass].setConnectionHandler(this.connectionHandler);

	return this.eventHandlers[remoteClass];
}

module.exports = ConnectionEventFactory;
