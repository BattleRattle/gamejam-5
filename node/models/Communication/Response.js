var Response = function (remoteClass, method, responseType, data) {

	this.remoteClass = remoteClass;
	this.method = method;
	this.responseType = responseType;
	this.data = data;

}

Response.prototype.TYPE_DIRECT = 'direct';
Response.prototype.TYPE_BROADCAST_INCLUDE_SELF = 'broadcast_include_self';
Response.prototype.TYPE_BROADCAST_EXCLUDE_SELF = 'broadcast_exclude_self';

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
