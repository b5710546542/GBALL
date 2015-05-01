var Bullet = cc.Sprite.extend({
	ctor: function(arrayBall , arraySmallBall){
		this._super();
		this.arrayBall = arrayBall;
		this.arraySmallBall = arraySmallBall;
		// console.log(this.arraySmallBall);
		this.collision = false;
		this.initWithFile( 'res/images/BulletTest.png' );
		this.ball = null;
	},

	update: function(dt){
		this.move();
		this.checkBoundOfBullet();
		this.checkCollision( this.arrayBall );
		this.checkCollision( this.arraySmallBall );
		this.getCollection();
	},

	checkBoundOfBullet: function(){
		if(this.y > screenHeight){
			this.removeFromParent();
            numberOfBullet = 0;
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
		for( var i = 0; i < arrayBall.length ; i++){
			if(arrayBall[i] != null){
                if( cc.rectOverlapsRect( this.getRect() , arrayBall[i].getRect() ) ){
                    this.ball= arrayBall[i].getPosition();
                    arrayBall[i].removeFromParent(true);
                    arrayBall.splice(i,1);
                    this.setPosition(new cc.Point(1000,1000));
                    this.removeFromParent();
                    numberOfBullet = 0;
                    this.collision =  true;
                }
            }
		}
		return this.collision;
	}
});