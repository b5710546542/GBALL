var Ball = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('res/images/ball.png');
		this.a = 5;
		Ball.DIR = {
			RIGHT: 1,
			LEFT: 2
		};

		this.direction = Ball.DIR.RIGHT
	},

	update: function(dt){
		var pos = this.getPosition();
		
		// this.a -= 1
		
		if(pos.y > 100) this.a += 1;
		else this.a -= 1;


		if( this.direction == Ball.DIR.RIGHT ){
			if( pos.x > screenWidth){
				this.direction = Ball.DIR.LEFT;
				this.setPosition( new cc.Point( pos.x-5 , pos.y-this.a ) );
			} else{
				this.setPosition( new cc.Point( pos.x+5 , pos.y-this.a ) );
			}
		} else{
			if( pos.x < 0){
				this.direction = Ball.DIR.RIGHT;
				this.setPosition( new cc.Point( pos.x+5 , pos.y-this.a ) );
			} else{
						this.setPosition( new cc.Point( pos.x-5 , pos.y-this.a ) );
			}
		}

		// if( pos.y < 0 ){
		// 	this.setPosition( new cc.Point( pos.x , pos.y+5 ) );
		// }
	}
});