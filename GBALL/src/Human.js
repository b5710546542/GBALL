var Human = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/man1.png' );

		Human.DIR = {
			Front: 0,
			RIGHT: 1,
			LEFT: 2	
		}

		this.direction = Human.DIR.Front;
		// this.move();
	},

	// setDirection: function( direction ){
	// 	this.direction = direction;
	// },

	move: function( dt ){
		var pos = this.getPosition();

		if( this.direction == Human.DIR.Front ){
			this.setPosition( new cc.Point( pos.x , pos.y ) );
        }

		if( this.direction == Human.DIR.RIGHT ){
			if ( pos.x < screenWidth ) {
        	    this.setPosition( new cc.Point( pos.x + 5, pos.y ) );
        	}
		}

		if( this.direction == Human.DIR.LEFT ){
			if ( pos.x < screenWidth ) {
        	    this.setPosition( new cc.Point( pos.x - 5, pos.y ) );
        	}
        }
		// this.setPosition( new cc.Point( pos.x+50 , pos.y ) );
	}

	// update: function(){
	// 	this.move();
	// }
});