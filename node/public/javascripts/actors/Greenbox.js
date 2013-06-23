greenboxActor = gamvas.Actor.extend({

    create: function(name, x, y, scale) {
        // IMPORTANT! initialize our actor by calling the super class constructor
        this._super(name, x, y);
        var st = gamvas.state.getCurrentState();
        this.setFile(st.resource.getImage('images/map/tilesets/greenbox.jpg'));

        this.scale(scale, scale);

        this.addState(new gamvas.ActorState('default'));
        this.setState('default');
    }
});
