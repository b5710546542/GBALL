var Ball = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/ball45.png' );
		// this.state = 50;
		this.velocity = 5;
		// this.setDirection( Ball.DIR.RIGHT );
		// this.array = [];
	},

	setDirection: function( direction ){
		this.direction = direction;
	},

	update: function( dt ){
		var pos = this.getPosition();

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
	},

	createNewBall: function( oldBallPos ){
		console.log("fghj");
		// var pos = oldBallPos;
		// GameLayer.ballr = new Ball();
		// GameLayer.ballr.setDirection(Ball.DIR.RIGHT);
		// GameLayer.ballr.setPosition( new cc.Point( pos.x , pos.y ) );
  //       GameLayer.addChild( GameLayer.ballr );
  //       GameLayer.ballr.scheduleUpdate();


		// GameLayer.ballr = new Ball();
		// GameLayer.ballr.setDirection(Ball.DIR.LEFT);
		// GameLayer.ballr.setPosition( new cc.Point( pos.x , pos.y ) );
  //       GameLayer.addChild( GameLayer.ballr );
  //       GameLayer.ballr.scheduleUpdate();
  
  //       this.balll = new Ball();
		// this.balll.setDirection(Ball.DIR.LEFT);
		// this.balll.setPosition( new cc.Point( pos.x , pos.y ) );
  //       this.addChild( this.balll );
  //       this.balll.scheduleUpdate();
	}

});

Ball.DIR = {
		RIGHT: 1,
		LEFT: 2
};