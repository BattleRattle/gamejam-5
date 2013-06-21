var ConnectionEventFactory = require('./ConnectionEventFactory.js');

var Game = function(connectionHandler) {

	this.connectionHandler = connectionHandler;
	this.connectionEventFactory = new ConnectionEventFactory();

}

Game.prototype.start = function() {
	var that = this;
	var victimEventHandler = this.connectionEventFactory.getEventHandler('Victim');

	setInterval(function() {
		var response = victimEventHandler.push();
		that.connectionHandler.broadcast('Victim', 'push', response);
	}, 30000);
}

module.exports = Game;
