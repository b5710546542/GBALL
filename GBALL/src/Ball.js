var Ball = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/b90.png' );
		this.velocity = 5;

	},

	setDirection: function( direction ){
		this.direction = direction;
	},

	update: function( dt ){
		
		var pos = this.getPosition();
		this.setRotation( pos.x );
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