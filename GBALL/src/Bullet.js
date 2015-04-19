var Bullet = cc.Sprite.extend({
	ctor: function(ball){
		this._super();
		this.ball = ball;
		this.initWithFile( 'res/images/BulletTest.png' );
		// this.numberOfBullet = 1;
	},

	update: function(dt){
		this.move();
		this.checkNumberOfBullet();
		
	},

	checkNumberOfBullet: function(){
		if(this.y > screenHeight){
			this.removeFromParent();
			// this.numberOfBullet = 1;
		}
		else if(this.checkCollision( this.ball.getRect()) ){
			// this.ball.createNewBall(this.ball.getPosition);
			this.ball.setPosition(new cc.Point(1000,1000));
			this.ball.removeFromParent();

			this.setPosition(new cc.Point(1000,1000));
			this.removeFromParent();
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