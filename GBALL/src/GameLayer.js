var score = 0;
var gameTime = false;
var time = 0;
var numberOfBullet = 0;
var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
 		this.setBackground = new cc.Sprite.create( 'res/images/bgg.png' );
        this.setBackground.setPosition( new cc.Point(screenWidth/2 , screenHeight/2) )
        this.addChild(this.setBackground);

        this.human = new Human();
        this.human.setPosition( new cc.Point(120,45) );
        this.addChild( this.human );
        this.human.scheduleUpdate();

        this.arrayBall = [];
        this.arraySmallBall = [];

        this.createBigBall();

        this.addKeyboardHandlers();    

        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 750, 350 ) );
        this.addChild( this.scoreLabel );

        this.timeLabel = cc.LabelTTF.create( '0' , 'Arial' , 40);
        this.timeLabel.setPosition( new cc.Point( 750 , 390 ) );
        this.addChild( this.timeLabel );
        
        this.scheduleUpdate();
        return true;
    },
    
    createBigBall: function(){
        var ball = new Ball(this.human);
        
        var rl = Math.round(Math.random());
        if(rl == 0) ball.setDirection( Ball.DIR.RIGHT );
        else ball.setDirection( Ball.DIR.LEFT );
        console.log(rl);
        
        var x = Math.random()*500;
        while(x < 100){
            x = Math.random()*500;
        }
        ball.setPosition( new cc.Point( x , 400 ) );
        console.log(x);
        
        this.addChild(ball);
        this.arrayBall.push(ball);
        ball.scheduleUpdate();
    },

    createSmallBall: function(ballpos){
        var ball = new ThirdBall(this.human);
        ball.setDirection(ThirdBall.DIR.RIGHT);
        ball.setPosition( new cc.Point(ballpos.x,ballpos.y) );
        this.addChild(ball);
        this.arraySmallBall.push(ball);
        ball.scheduleUpdate();

        var ball = new ThirdBall(this.human);
        ball.setDirection(ThirdBall.DIR.LEFT);
        ball.setPosition( new cc.Point(ballpos.x,ballpos.y) );
        this.addChild(ball);
        this.arraySmallBall.push(ball);
        ball.scheduleUpdate();
        
    },

    animation: function(){
        this.human.stopAction( this.human.movingAction );
        this.human.movingAction = this.human.createAnimationAction( this.human.direction );
        this.human.move();
        this.human.runAction( this.human.movingAction );
    },

    onKeyDown: function( keyCode , event ){
        var humanPos = this.human.getPosition();
//        
//        this.shoot = false;
//        this.turnRight = false;
//        this.turnLeft = false;
//        
//        if(keyCode == cc.KEY.space) this.shoot = true;
//        if(keyCode == cc.KEY.right) this.turnRight = true;
//        if(keyCode == cc.KEY.left) this.turnLeft = true;
//        
        if( keyCode == cc.KEY.space && numberOfBullet == 0){
            this.shooting( humanPos );
        }
        
        if( keyCode == cc.KEY.right ){
            this.human.direction = Human.DIR.RIGHT;
            this.checkRuning();
        }
        
        if( keyCode == cc.KEY.left ){
            this.human.direction = Human.DIR.LEFT;
            this.checkRuning();
        }
    },

    checkRuning: function(){
        if(!this.human.isRunning){
            this.animation();
            this.human.isRunning = true;
        }
    },

    onKeyUp: function( keyCode , event ){
        this.human.direction = Human.DIR.FRONT;
        this.human.isRunning = false;
        this.animation();
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

    shooting: function( humanPos ){
        this.createBullet( humanPos );
        numberOfBullet = 1;
    },

    createBullet: function( humanPos ){
        this.bullet = new Bullet(this.arrayBall , this.arraySmallBall);
        this.bullet.setPosition( new cc.Point( humanPos.x , 50) );
        this.addChild( this.bullet );
        this.bullet.scheduleUpdate();
    },

    update :function(dt){
        
        this.countTime();
        this.timeLabel.setString( timer );
        
        if( timer%10 == 0 && gameTime ){
            this.createBigBall();
            gameTime = false;
        }
        
        if( this.bullet != null ){
            if ( this.bullet.getBigCollision() ) {
                score += 5;
                this.bullet.setBigCollision( false );
                this.scoreLabel.setString( score );
                var ballpos = this.bullet.ball;
                this.createSmallBall(ballpos);
            }
            else if( this.bullet.getSmallCollision() ){
                score += 10;
                this.bullet.setSmallCollision( false );
                this.scoreLabel.setString( score );
            }
        }
    },
    
    countTime: function(){
        time++;
        if(time%30 == 0){
            timer++;
            gameTime = true;
        }
    }

});
var timer = 0;
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});