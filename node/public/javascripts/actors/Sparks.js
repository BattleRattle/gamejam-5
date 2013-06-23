sparkEmitter = gamvas.ParticleEmitter.extend({
    // overwrite constructor
    create: function(name, x, y, img, anim) {
        // call super constructor
        this._super(name, x, y, img, anim);
		this.layer = 10;

        // load the image, set center to middle
        var st = gamvas.state.getCurrentState();
        var sparkimg = new gamvas.Image(st.resource.getImage('images/damage/spark.png'));
        sparkimg.setCenter(16, 16);
        this.setImage(sparkimg);


        this.setParticleRate(100);
        // give the nozzle a little spreading angle
        this.setRotationRange(0.2);
        // particles start with a random rotation (0-360 degrees);
        this.setParticleRotationRange(2*Math.PI);
        // particles continue to rotate slowly (0.5 radians per seconds)
        this.setParticleRotationVelocityRange(0.5);
        // move with 50 pixels per second
        this.setParticleSpeed(50);
        // make the particles reduce its speed slowly
        this.setParticleVelocityDamping(0.08);
        // quickly fade in to alpha 0.1, then on 60% 0.3
        // then slowly back to 0.1 at 90% lifetime
        // and fade out
        this.setAlphaTable([ [0.0, 0.0], [0.03, 0.1], [0.6, 0.3], [0.9, 0.1], [1.0, 0.0]]);
        // start with pretty big images, then slowly fade to 100% size at
        // 70% lifetime, then even scale to 150% until end of lifetime
        this.setScaleTable([ [0.0, 0.7], [0.7, 1.0], [1.0, 1.5] ]);
        // particles live 10 seconds
        this.setParticleLifeTime(1);
    }
});
