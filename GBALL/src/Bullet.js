var Bullet = cc.Sprite.extend({
	ctor: function(arrayBall){
		this._super();
		this.arrayBall = arrayBall;
		this.collision = false;
		this.initWithFile( 'res/images/BulletTest.png' );
		this.ball = null;
	},

	update: function(dt){
		this.move();
		this.checkBoundOfBullet();
		this.checkCollision( this.arrayBall );
		this.getCollection();
	},

	checkBoundOfBullet: function(){
		if(this.y > screenHeight){
			this.removeFromParent();
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

	getCollection: function(){
		return this.collision;
	},

	setCollection: function(collision){
		this.collision = collision;
	},

	checkCollision: function( arrayBall ){
		// console.log(this.arrayBall.length)
		for( var i = 0; i < this.arrayBall.length ; i++){
			if(this.arrayBall[i] != null){
			if( cc.rectOverlapsRect( this.getRect() , arrayBall[i].getRect() ) ){
				// console.log("hit");
				this.ball= this.arrayBall[i].getPosition();
				// this.arrayBall[i].setPosition(new cc.Point(1000,1000));
				this.arrayBall[i].removeFromParent(true);
				this.arrayBall.splice(i,1);
				this.setPosition(new cc.Point(1000,1000));
				this.removeFromParent();

				this.collision =  true;
			}
		}
		numberOfBullet = 0;
		}
		return this.collision;
	}
});