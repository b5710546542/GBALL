var Bullet = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/bullet.png' );
	},

	update: function(){
		var pos = this.getPosition();

		this.setPosition( new cc.point( pos.x , pos.y+20 ) );
	}
})