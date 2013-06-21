
var MessageHandlerFactory = function (socket) {
	this.handler = new Array();
	this.socket = socket;
};

MessageHandlerFactory.prototype.getHandler = function(className) {
	if (!this.handler[className]) {
		this.handler[className] = new window[className + "MessageHandler"](this.socket);
	}

	return this.handler[className];
};
