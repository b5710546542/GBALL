var Ball = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('res/images/ball.png');

		Ball.DIR = {
			RIGHT: 1,
			LEFT: 2
		};

		this.direction = Ball.DIR.RIGHT
	},

	update: function(dt){
		var pos = this.getPosition();

		if( this.direction == Ball.DIR.RIGHT ){

			if( pos.x > screenWidth){
				this.direction = Ball.DIR.LEFT;
				this.setPosition( new cc.Point( pos.x-5 , pos.y ) );
			}else{
				this.setPosition( new cc.Point( pos.x+5 , pos.y ) );
			}
			
		} else{
						
			if( pos.x < 0){
				this.direction = Ball.DIR.RIGHT;
				this.setPosition( new cc.Point( pos.x+5 , pos.y ) );
			}else{
				this.setPosition( new cc.Point( pos.x-5 , pos.y ) );
			}
		}

		// if( pos.y < 0 ){
		// 	this.setPosition( new cc.Point( pos.x , pos.y+5 ) );
		// }
	}
});