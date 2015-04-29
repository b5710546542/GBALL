var SecondBall = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/ball45.png' );
		this.velocity = 5;

	},

	setDirection: function( direction ){
		this.direction = direction;
	},

	update: function( dt ){
		var pos = this.getPosition();

		var y = Math.sqrt(Math.abs( Math.pow(400,2)-Math.pow(pos.x,2) ) );
		if( y > 400 ){
			y = Math.sqrt(Math.abs( Math.pow(400,2)-Math.pow(y%400,2) ) )
		}
		if( this.direction == SecondBall.DIR.RIGHT ){
			if( pos.x > screenWidth-30 ){
				this.direction = SecondBall.DIR.LEFT;
				
				this.setPosition( new cc.Point( pos.x-5 , y ) );
			} else{
				this.setPosition( new cc.Point( pos.x+5 , y ) );
			}
		} else{
			if( pos.x < 30 ){
				this.direction = SecondBall.DIR.RIGHT;
				this.setPosition( new cc.Point( pos.x+5 , y ) );
			} else{
				this.setPosition( new cc.Point( pos.x-5 , y ) );
			}
		}
	},

	getRect:function(){
		var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect( spriteRect.x + dX,
                        spriteRect.y + dY,
                        spriteRect.width,
                        spriteRect.height );
	},

});

SecondBall.DIR = {
		RIGHT: 1,
		LEFT: 2
};