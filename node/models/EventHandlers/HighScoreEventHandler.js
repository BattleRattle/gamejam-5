var AbstractEventHandler = require('./AbstractEventHandler.js');

var HighScoreEventHandler = function () {

}

HighScoreEventHandler.prototype = AbstractEventHandler.prototype;
HighScoreEventHandler.CLASS_NAME = 'HighScore';

HighScoreEventHandler.prototype.getHighScore = function () {

	return this.createDirectResponse(HighScoreEventHandler.CLASS_NAME, 'getHighScore', [
		{
			"name": "Cpatain Awesome",
			"points": 100000
		},
		{
			"name": "Major Awesome",
			"points": 10000
		},
		{
			"name": "Master Awesome",
			"points": 1000
		}
	]

	);
}

module.exports = HighScoreEventHandler;
