// define our main actor state by extending gamvas.ActorState
defaultCityActorState = gamvas.ActorState.extend({
	actors: [],
	collisionBoxes: [],

	create: function (name, config) {
		this._super(name);
		this.config = config;
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
				var tileset = this.config.tilesets[this.config.tiles[xCounter][yCounter]];
				this.actors[xCounter][yCounter] = new tileActor("tile" + xCounter + "x" + yCounter, x, y, tileset);

				for (var i = tileset.collisions.length - 1; i >= 0; i--) {
					var box = new mapCollisionBoxActor("collision" + i, x + tileset.collisions[i].x, y + tileset.collisions[i].y, tileset.collisions[i]);
					this.collisionBoxes.push(box);
				}
				y += 512;
			}
			x += 512;
		}

        // assume a maximum camera zoom of 2!
        // thus we use full size map for calculations
        var startX = this.config.size.width * 512 * 2;
        var startY = this.config.size.height * 512 * 2;

        var scale =  (this.config.size.width > this.config.size.height)? (this.config.size.width):(this.config.size.width)* 2;
        this.backgroundActor = new greenboxActor("greenbox-background",-startX * 0.5, -startY * 0.5, scale);

	},

	draw: function (t) {
        this.backgroundActor.draw(t);
		for (var x = this.actors.length - 1; x >= 0; x--) {
			for (var y = this.actors[x].length - 1; y >= 0; y--) {
				this.actors[x][y].draw(t);
			}
		}
	}

});
