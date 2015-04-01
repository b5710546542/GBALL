var Human = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/man1.png' );

		this.direction = Human.DIR.Front;
		// this.move();
	},

	move: function(  ){

		var pos = this.getPosition();
		if( pos.x > 10 && pos.x < 790 ){
			if( this.direction == Human.DIR.Front ){
				this.setPosition( new cc.Point( pos.x , pos.y ) );
	        }
			else if( this.direction == Human.DIR.RIGHT ){
				if ( pos.x < screenWidth ) {
	        	    this.setPosition( new cc.Point( pos.x + 15, pos.y ) );
	        	}
			}
			else if( this.direction == Human.DIR.LEFT ){
				if ( pos.x < screenWidth ) {
	        	    this.setPosition( new cc.Point( pos.x - 15, pos.y ) );
	        	}
	        }
    	}else if( pos.x <= 10 ){
    		this.setPosition( new cc.Point( pos.x + 10 , pos.y ) );
    	}else if( pos.x >= 790 ){
    		this.setPosition( new cc.Point( pos.x - 10 , pos.y ) );
    	}
		// this.setPosition( new cc.Point( pos.x+50 , pos.y ) );
	}

	// update: function(){
	// 	this.move();
	// }
});

Human.DIR = {
		Front: 0,
		RIGHT: 1,
		LEFT: 2	
};