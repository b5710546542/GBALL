var Bullet = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/bt.png' );
	},

	update: function(dt){
		this.move();
	},

	move: function(){
		var pos = this.getPosition();
		this.setPosition( new cc.Point( pos.x , pos.y+20 ) );
	}
});