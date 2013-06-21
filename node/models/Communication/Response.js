var Response = function (remoteClass, method, responseType, data) {

	this.TYPE_DIRECT = 'direct';
	this.TYPE_BROADCAST = 'broadcast';

	this.remoteClass = remoteClass;
	this.method = method;
	this.responseType = responseType;
	this.data = data;

}

Response.prototype.getRemoteClass = function () {
	return this.remoteClass;
}

Response.prototype.getMethod = function () {
	return this.method;
}

Response.prototype.getType = function () {
	return this.responseType;
}

Response.prototype.getData = function () {
	return this.data;
}

module.exports = Response;
