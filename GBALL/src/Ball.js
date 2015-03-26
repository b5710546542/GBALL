var Ball = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/ball.png' );
		// this.state = 50;
		this.acceleration = 5;
		Ball.DIR = {
			RIGHT: 1,
			LEFT: 2
		};

		this.direction = Ball.DIR.RIGHT
	},

	update: function( dt ){
		var pos = this.getPosition();
		
		// this.a -= 1
		
		if( pos.y > 180 ) this.acceleration += 1;
		else this.acceleration -= 1;


		if( this.direction == Ball.DIR.RIGHT ){
			if( pos.x > screenWidth ){
				this.direction = Ball.DIR.LEFT;
				this.setPosition( new cc.Point( pos.x-6 , pos.y-this.acceleration ) );
			} else{
				this.setPosition( new cc.Point( pos.x+6 , pos.y-this.acceleration ) );
			}
		} else{
			if( pos.x < 0 ){
				this.direction = Ball.DIR.RIGHT;
				this.setPosition( new cc.Point( pos.x+6 , pos.y-this.acceleration ) );
			} else{
				this.setPosition( new cc.Point( pos.x-6 , pos.y-this.acceleration ) );
			}
		}

		// if( pos.y < 0 ){
		// 	this.setPosition( new cc.Point( pos.x , pos.y+5 ) );
		// }
	}
});