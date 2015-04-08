var Ball = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/ball45.png' );
		// this.state = 50;
		this.velocity = 5;
		this.direction = Ball.DIR.RIGHT
	},

	update: function( dt ){
		var pos = this.getPosition();

		// this.a -= 1
		if( pos.y > 200 ){
			this.velocity -= 1;
		} 
		else{
			this.velocity += 1;
		} 

		if( this.direction == Ball.DIR.RIGHT ){
			if( pos.x > screenWidth-30 ){
				this.direction = Ball.DIR.LEFT;
				this.setPosition( new cc.Point( pos.x-3 , pos.y+this.velocity ) );
			} else{
				this.setPosition( new cc.Point( pos.x+3 , pos.y+this.velocity ) );
			}
		} else{
			if( pos.x < 30 ){
				this.direction = Ball.DIR.RIGHT;
				this.setPosition( new cc.Point( pos.x+3 , pos.y+this.velocity ) );
			} else{
				this.setPosition( new cc.Point( pos.x-3 , pos.y+this.velocity ) );
			}
		}
	},

	// closeTo: function( obj ){
	// 	var myPos = this.getPosition();
	// 	var oPos = obj.getPosition();
	// 	return ( ( Math.abs(myPos.x - oPos.x ) <= 30 ) ||
	// 		( Math.abs(myPos.y - oPos.y ) <= 30 ) );
	// },
	getRect:function(){
		 var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect( spriteRect.x + dX,
                        spriteRect.y + dY,
                        spriteRect.width,
                        spriteRect.height );
	}
});

Ball.DIR = {
		RIGHT: 1,
		LEFT: 2
};