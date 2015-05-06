var Bullet = cc.Sprite.extend({
	ctor: function(arrayBall , arraySmallBall){
		this._super();
		this.arrayBall = arrayBall;
		this.arraySmallBall = arraySmallBall;
		// console.log(this.arraySmallBall);
		// this.collision = false;
		this.bigCollision = false;
		this.smallCollision = false;
		this.initWithFile( 'res/images/BulletTest.png' );
		this.ball = null;
	},

	update: function(dt){
		this.move();
		this.checkBoundOfBullet();
		this.checkBigCollision( this.arrayBall );
		this.checkSmallCollision( this.arraySmallBall );
		this.getBigCollision();
		this.getSmallCollision();
	},

	checkBoundOfBullet: function(){
		if(this.y > screenHeight){
			this.removeFromParent();
            numberOfBullet = 1;
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

	getBigCollision: function(){
		return this.bigCollision;
	},

	setBigCollision: function(collision){
		this.bigCollision = collision;
	},

	getSmallCollision: function(){
		return this.smallCollision;
	},

	setSmallCollision: function(collision){
		this.smallCollision = collision;
	},

	checkBigCollision: function( arrayBall ){
		for( var i = 0; i < arrayBall.length ; i++){
			if(arrayBall[i] != null){
                if( cc.rectOverlapsRect( this.getRect() , arrayBall[i].getRect() ) ){
                    this.ball= arrayBall[i].getPosition();
                    arrayBall[i].removeFromParent(true);
                    arrayBall.splice(i,1);
                    this.setPosition(new cc.Point(1000,1000));
                    this.removeFromParent();
                    numberOfBullet = 1;
                    this.bigCollision =  true;
                }
            }
		}
		return this.bigCollision;
	},

	checkSmallCollision: function( arrayBall ){
		for( var i = 0; i < arrayBall.length ; i++){
			if(arrayBall[i] != null){
                if( cc.rectOverlapsRect( this.getRect() , arrayBall[i].getRect() ) ){
                    this.ball= arrayBall[i].getPosition();
                    arrayBall[i].removeFromParent(true);
                    arrayBall.splice(i,1);
                    this.setPosition(new cc.Point(1000,1000));
                    this.removeFromParent();
                    numberOfBullet = 1;
                    this.smallCollision =  true;
                }
            }
		}
		return this.smallCollision;
	}

});