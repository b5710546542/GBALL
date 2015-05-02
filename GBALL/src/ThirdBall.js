var ThirdBall = cc.Sprite.extend({
	ctor: function(human){
		this._super();
		this.initWithFile( 'res/images/b45.png' );
		// this.velocity = 5;
		this.human = human;
		this.speedX = 5;
		this.speedY = 6;
	},

	setDirection: function( direction ){
		if(direction == ThirdBall.DIR.RIGHT){
            this.speedX *= -1;
        }
	},

	update: function( dt ){
		
		this.checkCollision( this.human );

		var pos = this.getPosition();
		this.setRotation( pos.x );
		if(pos.x < 30 || pos.x > screenWidth-30){
			this.speedX *= -1;
			if(pos.x < 30){
				this.setPositionX(30);
			}
			else if(pos.x > screenWidth-30){
				this.setPositionX(screenWidth-30);
			}
		}else{
			this.setPositionX( pos.x + this.speedX );
		}

		if(pos.y < 30 || pos.y > screenHeight-30){
			this.speedY *= -1;
			if(pos.y < 30){
				this.setPositionY(30);
			}
			else if(pos.y > screenHeight-30){
				this.setPositionY(screenHeight-30);
			}
		}else{
			this.setPositionY( pos.y + this.speedY );
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
			console.log("hit human");
		}
	}

});

ThirdBall.DIR = {
		RIGHT: 1,
		LEFT: 2
};