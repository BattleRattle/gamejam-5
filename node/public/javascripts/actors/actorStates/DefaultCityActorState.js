// define our main actor state by extending gamvas.ActorState
defaultCityActorState = gamvas.ActorState.extend({
	actors: [],

	create: function (name, config) {
		this._super(name);
		this.config = config;
		console.log(config);
	},

	init: function () {
		this.dim = gamvas.getCanvasDimension();

		var minX = -this.config.size.width * 512 / 2;
		var minY = -this.config.size.height * 512 / 2;
		var x = minX;
		for (var xCounter = 0; xCounter < this.config.size.width; xCounter++) {
			var y = minY;
			this.actors[xCounter] = [];
			for (var yCounter = 0; yCounter < this.config.size.height; yCounter++) {
				this.actors[xCounter][yCounter] = new tileActor("tile" + xCounter + "x" + yCounter, x, y, this.config.tilesets[this.config.tiles[xCounter][yCounter]]);
				y += 512;
			}
			x += 512;
		}

		console.log (this.actors)
	},

	draw: function (t) {
		for (var x = this.actors.length - 1; x >= 0; x--) {
			for (var y = this.actors[x].length - 1; y >= 0; y--) {
				this.actors[x][y].draw(t);
			}
		}
	}

});
