var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
 		
        this.human = new Human();
        this.human.setPosition( new cc.Point(120,45) );
        this.addChild( this.human );
        this.human.scheduleUpdate();

        this.ball = new Ball();
        this.ball.setDirection(Ball.DIR.RIGHT);
        // this.ball.setPosition( new cc.Point(100,400) );
        this.ball.setPosition( new cc.Point(100,30) );
        this.addChild( this.ball );
        this.ball.scheduleUpdate();

        this.addKeyboardHandlers();      
        
        return true;
    },

    onKeyDown: function( keyCode , event ){
        var humanPos = this.human.getPosition();
        this.shooting( humanPos , keyCode , event );

        if( keyCode == cc.KEY.right ){
            this.human.direction = Human.DIR.RIGHT;
            this.human.stopAction( this.human.movingAction );
            this.human.movingAction = this.human.createAnimationAction( this.human.direction );
            this.human.move();
            this.human.runAction( this.human.movingAction );
        }else if( keyCode == cc.KEY.left ){
            this.human.direction = Human.DIR.LEFT;
            this.human.stopAction( this.human.movingAction );
            this.human.movingAction = this.human.createAnimationAction( this.human.direction );
            this.human.move();
            this.human.runAction( this.human.movingAction );
        }
    },

    onKeyUp: function( keyCode , event ){
        this.human.direction = Human.DIR.FRONT;
        this.human.stopAction( this.human.movingAction );
        this.human.movingAction = this.human.createAnimationAction( this.human.direction );
        this.human.move();
        this.human.runAction( this.human.movingAction );
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

    shooting: function( humanPos , keyCode , event ){
        if( keyCode == cc.KEY.space ){
            this.createBullet( humanPos);
        }
    },

    createBullet: function( humanPos ){
        this.bullet = new Bullet(this.ball);
        this.bullet.setPosition( new cc.Point( humanPos.x , 50) );
        this.addChild( this.bullet );
        this.bullet.scheduleUpdate();
    },

    update :function(){
       
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