var ConnectionEventFactory = require('./ConnectionEventFactory.js');
var Response = require('./Communication/Response.js');
var VictimEventHandler = require('./EventHandlers/VictimEventHandler.js');

var Game = function(connectionHandler) {

	this.connectionHandler = connectionHandler;
	this.connectionEventFactory = new ConnectionEventFactory();

}

Game.prototype.start = function() {
	var that = this;
	var victimEventHandler = this.connectionEventFactory.getEventHandler('Victim');

	setInterval(function() {
		var data = victimEventHandler.push();
		var response = new Response(VictimEventHandler.prototype.CLASS_NAME, 'push', Response.TYPE_BROADCAST, data);

		that.connectionHandler.sendBroadcast(response);
	}, 1000);
}

module.exports = Game;
