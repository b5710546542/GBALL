var Enter = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/Enter4.png' );

		this.movingAction = this.createAnimationAction( );
		this.runAction( this.movingAction );
	},

	createAnimationAction: function( direction ) {
		var animation = new cc.Animation.create();
        
        animation.addSpriteFrameWithFile( 'res/images/Enter1.png' );
        animation.addSpriteFrameWithFile( 'res/images/Enter2.png' );
		animation.addSpriteFrameWithFile( 'res/images/Enter3.png' );
		animation.addSpriteFrameWithFile( 'res/images/Enter2.png' );
        animation.addSpriteFrameWithFile( 'res/images/Enter1.png' );
        animation.addSpriteFrameWithFile( 'res/images/Enter4.png' );
        
		animation.setDelayPerUnit( 0.2 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
		
    },

	update: function(){
		
	}
});