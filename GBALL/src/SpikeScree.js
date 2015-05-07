var SpikeScree = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile( 'res/images/SpikeScree1.png' );

		this.movingAction = this.createAnimationAction( );
		this.runAction( this.movingAction );
	},

	createAnimationAction: function( direction ) {
		var animation = new cc.Animation.create();
        
        animation.addSpriteFrameWithFile( 'res/images/SpikeScree2.png' );
        animation.addSpriteFrameWithFile( 'res/images/SpikeScree1.png' );
        
		animation.setDelayPerUnit( 0.4 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
		
    },

	update: function(){
		
	}
});