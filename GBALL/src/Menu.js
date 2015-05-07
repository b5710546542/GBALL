var Menu = cc.Layer.extend({
	ctor: function(){
		this._super();
		this.init();
	},

	init: function(){
		this._super();
		var bg = cc.Sprite.create( res.bg );
		bg.setPosition( new cc.p(screenWidth/2,screenHeight/2) );
		this.addChild(bg);
        
        var logo = new cc.Sprite.create( 'res/images/logo2.png' );
        logo.setPosition( new cc.Point( 200 , 300  ));
        this.addChild( logo );
        
        var title = new cc.Sprite.create( 'res/images/Title2.png' );
        title.setPosition( new cc.Point( 440 , 350  ));
        this.addChild( title );
        
        var newGame = new NewGame();
        newGame.setPosition( new cc.Point( 250 , 140  ));
        this.addChild( newGame );
        newGame.scheduleUpdate();
        
        
        var spikeScree = new SpikeScree();
        spikeScree.setPosition( new cc.Point( 600 , 190  ));
        this.addChild( spikeScree );
        spikeScree.scheduleUpdate();
        
//        this.movingAction = this.createAnimationAction();
//		this.runAction( this.movingAction );
        
        
		this.addKeyboardHandlers();
	},
    
    createAnimationAction: function() {
		var titleAnimation = new cc.Animation.create();
			titleAnimation.addSpriteFrameWithFile( 'res/images/Title1.png' );
			titleAnimation.addSpriteFrameWithFile( 'res/images/Title2.png' );
			titleAnimation.addSpriteFrameWithFile( 'res/images/Title3.png' );
			
		titleAnimation.setDelayPerUnit( 0.2 );
		return cc.RepeatForever.create( cc.Animate.create( titleAnimation ) );
		
    },

	addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);
    },

    onKeyDown: function( keyCode, event ) {
        
    },
    
    onKeyUp: function( keyCode, event ) {
        if (keyCode == cc.KEY.enter) {
            cc.director.runScene(new StartScene());
        }
    },
    
    update: function(dt) {

    }
});

var MainScene = cc.Scene.extend({
   onEnter: function() {
       this._super();
       var layer = new Menu();
       layer.init();
       this.addChild( layer );
   }
});
