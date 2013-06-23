var Application = {
	scenes: {

	},
	levelData: {},
	images: {},
	bombCounter: 0
}

gamvas.event.addOnLoad(function() {
	// some first fake full screen size

	// @todo this should be removed at some points add some proper handling
	var canvas = document.getElementById("gameCanvas");
	if (canvas.getContext) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	// add states here
	Application.scenes["high_score"] = new highScoreScene('high_score');
	Application.scenes["level"] = new levelScene('level')
	gamvas.state.addState(new startScene('start'));
	gamvas.state.addState(Application.scenes["high_score"]);
	gamvas.state.addState(Application.scenes["level"]);


	// this will initialize the canvas
	gamvas.start('gameCanvas', true);

	// provide fullscreen switch if browser is capable of fullscreen
	// @todo this does not really work yet
	if (gamvas.hasFullScreen()) {
		var fs = document.getElementById('fullscreen');
		fs.innerHTML = '<a href="javascript:void(0);" onclick="gamvas.setFullScreen(true);">Go FullScreen</a>';
	}

	var st = gamvas.state.getCurrentState();
});
