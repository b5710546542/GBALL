var End = cc.Layer.extend({
	ctor: function(){
		this._super();
		this.init();
	},

	init: function(){
		this._super();
		var bge = cc.Sprite.create( res.bg );
		bge.setPosition( new cc.p(screenWidth/2,screenHeight/2) );
		this.addChild(bge);
        
        var gameOver = new cc.Sprite.create( 'res/images/GameOver.png' );
        gameOver.setPosition( new cc.Point( 400 , 350  ));
        this.addChild( gameOver );
        
        var backScore = new cc.Sprite.create( 'res/images/BackScore.png' );
        backScore.setPosition( new cc.Point( 400 , 220  ));
        this.addChild( backScore );
        
        var finalScore = new cc.Sprite.create( 'res/images/FinalScore.png' );
        finalScore.setPosition( new cc.Point( 400 , 250  ));
        this.addChild( finalScore );
        
        var enter = new Enter();
        enter.setPosition( new cc.Point( 400 , 100  ));
        this.addChild( enter );
        enter.scheduleUpdate();
        
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 400, 210 ) );
        this.scoreLabel.setString( score );
        this.addChild( this.scoreLabel );
        
		this.addKeyboardHandlers();
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
            cc.director.runScene(new MainScene());
        }
    },
    
    update: function(dt) {

    }
});

var EndScene = cc.Scene.extend({
   onEnter: function() {
       this._super();
       var layer = new End();
       layer.init();
       this.addChild( layer );
   }
});
