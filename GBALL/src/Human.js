var Human = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/p1.png' );

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

	move: function(){
		var pos = this.getPosition();
		// if( this.direction == Human.DIR.RIGHT ){
		// 	console.log( 'Right' );
		// }else if( this.direction == Human.DIR.LEFT ){
		// 	console.log( 'Left' );
		// }else{

		// }
		this.setPosition( new cc.Point( pos.x+50 , pos.y ) );
	}
});