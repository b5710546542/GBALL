var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
 		
        var human = new Human();
        human.setPosition( new cc.Point(120,45) );
        this.addChild( human );
        human.scheduleUpdate();

        var ball = new Ball();
        // ball.setPosition( new cc.Point(100,400) );
        ball.setPosition( new cc.Point(100,30) );
        this.addChild( ball );
        ball.scheduleUpdate();

        this.addKeyboardHandlers();      
        
        return true;
    },

    onKeyDown: function( keyCode , event ){
        if( keyCode == cc.KEY.space ){
            var bullet = new Bullet();
            bullet.setPosition( new cc.Point( this.human.pos.x , 50) );
            this.addChild( bullet );
        }

        if( keyCode == cc.KEY.right ){
            console.log( 'Right' );
            // this.human.direction = Human.DIR.RIGHT;
            // this.human.setDirection( keyCode );
            this.human.move();
        }else if( keyCode == cc.KEY.left ){
            console.log( 'Left' );
            // this.human.direction = Human.DIR.LEFT;
            // this.human.setDirection( keyCode );
            this.human.move();
        }
    },

    onKeyUp: function( keyCode , event ){
        console.log( 'Up: ' + keyCode.toString() );
    },

    addKeyboardHandlers: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function( keyCode , event ){
                self.onKeyDown( keyCode , event );
            },
            onKeyReleased: function( keyCode , event ){
                self.onKeyUp( keyCode , event );
            }
        },this);
    }

});
 
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});