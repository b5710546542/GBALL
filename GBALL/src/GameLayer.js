var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
 		
        this.human = new Human();
        this.human.setPosition( new cc.Point(120,45) );
        this.addChild( this.human );
        this.human.scheduleUpdate();

        this.ball = new Ball();
        this.ball.setPosition( new cc.Point(100,400) );
        // this.ball.setPosition( new cc.Point(100,30) );
        this.addChild( this.ball );
        this.ball.scheduleUpdate();

        this.addKeyboardHandlers();      
        
        return true;
    },

    onKeyDown: function( keyCode , event ){
        var humanPos = this.human.getPosition();
        if( keyCode == cc.KEY.space ){
            this.bullet = new Bullet(this.ball);
            this.bullet.setPosition( new cc.Point( humanPos.x , 50) );
            this.addChild( this.bullet );
            this.bullet.scheduleUpdate();
        }
        else if( keyCode == cc.KEY.right ){
            console.log( 'Right' );
            this.human.direction = Human.DIR.RIGHT;
            this.human.move();
        }else if( keyCode == cc.KEY.left ){
            console.log( 'Left' );
            this.human.direction = Human.DIR.LEFT;
            this.human.move();
        }
    },

    onKeyUp: function( keyCode , event ){
        console.log( 'Up: ' + keyCode.toString() );
        this.human.direction = Human.DIR.FRONT;
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
    },

    update :function(){
        // if( this.ball.closeTo( this.bullet ) ){
        //     console.log("hit");
        //     this.ball2 = new Ball();
        //     this.setPosition( new cc.Point( 100 , 400 ) );
        //     this.addChild( this.ball2 );
        //     this.ball2.scheduleUpdate();
        // }
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