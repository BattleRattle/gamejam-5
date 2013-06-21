var Response = function (remoteClass, method, responseType, data) {

	this.remoteClass = remoteClass;
	this.method = method;
	this.responseType = responseType;
	this.data = data;

}

Response.prototype.TYPE_DIRECT = 'direct';
Response.prototype.TYPE_BROADCAST = 'broadcast';

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
