// define our main actor state by extending gamvas.ActorState
defaultCityActorState = gamvas.ActorState.extend({
	actors: [],

	init: function () {
		this.dim = gamvas.getCanvasDimension();

		var xTiles = Math.ceil(this.dim.w / 512);
		var yTiles = Math.ceil(this.dim.h / 512)

		var minX = -xTiles * 512 / 2;
		var minY = -yTiles * 512 / 2;
		var x = minX;
		for (var xCounter = 0; xCounter < xTiles; xCounter++) {
			var y = minY;
			this.actors[xCounter] = new Array();
			for (var yCounter = 0; yCounter < yTiles; yCounter++) {
				this.actors[xCounter][yCounter] = new tileActor("tile" + xCounter + "x" + yCounter, x, y);
				y += 512;
			}
			x += 512;
		}
	},

	draw: function (t) {
		for (var x = this.actors.length - 1; x >= 0; x--) {
			for (var y = this.actors[x].length - 1; y >= 0; y--) {
				this.actors[x][y].draw(t);
			}
		}
	}

});
