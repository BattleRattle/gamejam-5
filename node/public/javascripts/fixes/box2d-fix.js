// This fix is required since web version of Box2D does not provide it
Box2D.Dynamics.b2Body.prototype.ApplyAngularImpulse = function(impulse) {
	var b2Body = Box2D.Dynamics.b2Body;

	if (this.m_type != b2Body.b2_dynamicBody) {
		return;
	}
	if (this.IsAwake() == false) {
		this.SetAwake(true);
	}
	this.m_angularVelocity += this.m_invI * impulse;
};

multiplyVec2D = function(vec, num) {
	var temp;
	if (typeof vec.Copy == "function") {
		temp = vec.Copy();
	} else if (typeof vec.Copy == "function") {
		temp = vec.copy();
	} else {
		temp = new gamvas.Vector2D();
	}

	temp.x = vec.x * num;
	temp.y = vec.y * num;

	return temp;
};