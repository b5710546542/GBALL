var Human = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/man1.png' );

		this.direction = Human.DIR.FRONT;


		this.movingAction = this.createAnimationAction( this.direction );
		this.runAction( this.movingAction );
	},

	createAnimationAction: function( direction ) {
		var animation = new cc.Animation.create();
		if( direction == Human.DIR.FRONT ){
			// console.log( "front" );
			animation.addSpriteFrameWithFile( 'res/images/man6.png' );
			animation.addSpriteFrameWithFile( 'res/images/man7.png' );
			// animation.addSpriteFrameWithFile( 'res/images/man7.png' );
			// animation.setDelayPerUnit( 0.2 );
		}else if( direction == Human.DIR.RIGHT ){
			// console.log( "right" );
			animation.addSpriteFrameWithFile( 'res/images/man4.png' );
			animation.addSpriteFrameWithFile( 'res/images/man5.png' );
			// animation.addSpriteFrameWithFile( 'res/images/man7.png' );
			// animation.setDelayPerUnit( 0.1 );
		}else if( direction == Human.DIR.LEFT ){
			// console.log( "left" );
			animation.addSpriteFrameWithFile( 'res/images/man2.png' );
			animation.addSpriteFrameWithFile( 'res/images/man3.png' );
			// animation.addSpriteFrameWithFile( 'res/images/man7.png' );
			// animation.setDelayPerUnit( 0.1 );
		}
		// console.log( animation.getDelayPerUnit() );
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
