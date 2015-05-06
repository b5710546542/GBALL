var Ball = cc.Sprite.extend({
	ctor: function(human){
		this._super();
		this.initWithFile( 'res/images/b90.png' );
		this.velocity = 5;
        this.human = human;
	},

	setDirection: function( direction ){
		this.direction = direction;
	},

	update: function( dt ){
		
        this.checkCollision( this.human );
        
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
				this.setPosition( new cc.Point( pos.x-4 , pos.y+this.velocity ) );
			} else{
				this.setPosition( new cc.Point( pos.x+4 , pos.y+this.velocity ) );
			}
		} else{
			if( pos.x < 30 ){
				this.direction = Ball.DIR.RIGHT;
				this.setPosition( new cc.Point( pos.x+4 , pos.y+this.velocity ) );
			} else{
				this.setPosition( new cc.Point( pos.x-4 , pos.y+this.velocity ) );
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
    
    checkCollision: function(human){
		if( cc.rectOverlapsRect( this.getRect() , human.getRect() ) ){
//			console.log("hit human");
            isDecreaseLife = true;
		}
	}

});

Ball.DIR = {
		RIGHT: 1,
		LEFT: 2
};