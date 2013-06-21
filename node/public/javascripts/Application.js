
gamvas.event.addOnLoad(function() {
	gamvas.state.addState(new startScene('start'));
	gamvas.state.addState(new levelScene('level'));
	gamvas.start('gameCanvas');
	// provide fullscreen switch if browser is capable of fullscreen
	if (gamvas.hasFullScreen()) {
		var fs = document.getElementById('fullscreen');
		fs.innerHTML = '<a href="javascript:void(0);" onclick="gamvas.setFullScreen(true);">Go FullScreen</a>';
	}
});
