var Ball = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('res/images/ball.png');
	}


	update: function(dt){
		var pos = this.getPosition();
		this.setPosition( new cc.Point( pos.x+5 , pos.y ) );
	}
});