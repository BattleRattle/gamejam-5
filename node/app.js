/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	io = require('socket.io').listen(8080),
	connectionHandler = require('./models/ConnectionHandler.js'),
	Game = require('./models/Game.js');

var DataLoaderFactory = require('./models/DataLoaderFactory'),
	LevelGenerator = require('./models/Level/LevelGenerator');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});

connectionHandler = new connectionHandler(io);
var game = new Game(connectionHandler);
game.start();

var fac = new DataLoaderFactory();
var mapGen = new LevelGenerator(fac);

var level = mapGen.getLevel("tutorial");
