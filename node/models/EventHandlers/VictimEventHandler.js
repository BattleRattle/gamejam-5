var VictimEventHandler = function () {

	this.victimCounter = 0;

}

VictimEventHandler.prototype.push = function() {
	return {
		'id': ++this.victimCounter,
		'x': 1130,
		'y': 230
	};
}

module.exports = VictimEventHandler;
