var NewGame = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/NewGame4.png' );

		this.movingAction = this.createAnimationAction( );
		this.runAction( this.movingAction );
	},

	createAnimationAction: function( direction ) {
		var animation = new cc.Animation.create();
        
        animation.addSpriteFrameWithFile( 'res/images/NewGame1.png' );
        animation.addSpriteFrameWithFile( 'res/images/NewGame2.png' );
		animation.addSpriteFrameWithFile( 'res/images/NewGame3.png' );
		animation.addSpriteFrameWithFile( 'res/images/NewGame2.png' );
        animation.addSpriteFrameWithFile( 'res/images/NewGame1.png' );
        
		animation.setDelayPerUnit( 0.2 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
		
    },

	update: function(){
		
	}
});