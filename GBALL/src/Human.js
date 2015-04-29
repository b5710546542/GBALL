var Human = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/man11.png' );

		this.direction = Human.DIR.FRONT;
		this.isRunning = false;

		this.movingAction = this.createAnimationAction( this.direction );
		this.runAction( this.movingAction );
	},

	createAnimationAction: function( direction ) {
		var animation = new cc.Animation.create();
		if( direction == Human.DIR.FRONT ){
			animation.addSpriteFrameWithFile( 'res/images/man11.png' );
			animation.addSpriteFrameWithFile( 'res/images/man12.png' );
			animation.addSpriteFrameWithFile( 'res/images/man13.png' );
			animation.addSpriteFrameWithFile( 'res/images/man14.png' );
		}else if( direction == Human.DIR.RIGHT ){
			animation.addSpriteFrameWithFile( 'res/images/man30.png' );
			animation.addSpriteFrameWithFile( 'res/images/man31.png' );
			animation.addSpriteFrameWithFile( 'res/images/man32.png' );
			animation.addSpriteFrameWithFile( 'res/images/man33.png' );
		}else if( direction == Human.DIR.LEFT ){
			animation.addSpriteFrameWithFile( 'res/images/man20.png' );
			animation.addSpriteFrameWithFile( 'res/images/man21.png' );
			animation.addSpriteFrameWithFile( 'res/images/man22.png' );
			animation.addSpriteFrameWithFile( 'res/images/man23.png' );
		}
		animation.setDelayPerUnit( 0.2 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
		
    },

	update: function(){
		this.move();
	},

	move: function(  ){

		var pos = this.getPosition();
		if( pos.x > 10 && pos.x < 790 ){
			if( this.direction == Human.DIR.Front ){
				this.setPosition( new cc.Point( pos.x , pos.y ) );
	        }
			else if( this.direction == Human.DIR.RIGHT ){
				if ( pos.x < screenWidth ) {
	        	    this.setPosition( new cc.Point( pos.x + 5, pos.y ) );
	        	}
			}
			else if( this.direction == Human.DIR.LEFT ){
				if ( pos.x < screenWidth ) {
	        	    this.setPosition( new cc.Point( pos.x - 5, pos.y ) );
	        	}
	        }
    	}else if( pos.x <= 10 ){
    		this.setPosition( new cc.Point( pos.x + 1 , pos.y ) );
    	}else if( pos.x >= 790 ){
    		this.setPosition( new cc.Point( pos.x - 1 , pos.y ) );
    	}
	}

});

Human.DIR = {
	FRONT: 0,
	RIGHT: 1,
	LEFT: 2	
};
