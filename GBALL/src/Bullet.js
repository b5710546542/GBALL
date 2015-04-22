var Bullet = cc.Sprite.extend({
	ctor: function(arrayBall){
		this._super();
		this.arrayBall = arrayBall;
		this.initWithFile( 'res/images/BulletTest.png' );
		// this.numberOfBullet = 1;
	},

	update: function(dt){
		this.move();
		this.checkBoundOfBullet();
		
	},

	checkBoundOfBullet: function(){
		if(this.y > screenHeight){
			this.removeFromParent();
		}
		var i = 0 ;
		for( i = 0; i < this.arrayBall.length ; i++){
			if(this.checkCollision( this.arrayBall.get(i).getRect() ) ){
				// this.ball.createNewBall(this.ball.getPosition);
				this.arrayBall.get(i).setPosition(new cc.Point(1000,1000));
				this.arrayBall.get(i).removeFromParent();
				this.setPosition(new cc.Point(1000,1000));
				this.removeFromParent();
				GameLayer.createBall();
			}
			// this.ball = new Ball();
			// this.ball.setDirection(Ball.DIR.RIGHT);
			// this.updateNumberOfBullet();
		}
	},

	move: function(){
		var pos = this.getPosition();
		this.setPosition( new cc.Point( pos.x , pos.y+20 ) );
	},

	getRect: function(){
		var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect( spriteRect.x + dX,
                        spriteRect.y + dY,
                        spriteRect.width,
                        spriteRect.height );
	},

	checkCollision: function(Rect){
		return cc.rectOverlapsRect(this.getRect(),Rect);
	}
});