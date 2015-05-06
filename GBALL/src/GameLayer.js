var score = 0;
var gameTime = false;
var time = 0;
var numberOfBullet = 0;
var life = 1000;
var isDecreaseLife = false;
var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
 		this.setBackground = new cc.Sprite.create( 'res/images/bgg.png' );
        this.setBackground.setPosition( new cc.Point(screenWidth/2 , screenHeight/2) )
        this.addChild(this.setBackground);

        this.hp = new cc.Sprite.create( 'res/images/HP.png' );
        this.hp.setPosition( new cc.Point( 10 , 400  ));
        this.hp.setAnchorPoint(0,0);
        this.addChild( this.hp );
        
        this.human = new Human();
        this.human.setPosition( new cc.Point(100,45) );
        this.addChild( this.human );
        this.human.scheduleUpdate();

        this.arrayBall = [];
        this.arraySmallBall = [];

        this.createBigBall();

        this.addKeyboardHandlers();    

        this.createScoreLabel();
        this.scoreText = cc.LabelTTF.create( '0' , 'Arial' , 40);
        this.scoreText.setPosition( new cc.Point( 730 , 420 ) );
        this.addChild( this.scoreText );
        this.scoreText.setString( "score" );
        
        this.shoot = false;
        this.turnRight = false;
        this.turnLeft = false;
        
        this.scheduleUpdate();
        return true;
    },
    
    createScoreLabel: function(){
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 750, 380 ) );
        this.addChild( this.scoreLabel );
    },
    
    createBigBall: function(){
        var ball = new Ball(this.human);
        
        var rl = Math.round(Math.random());
        if(rl == 0) ball.setDirection( Ball.DIR.RIGHT );
        else ball.setDirection( Ball.DIR.LEFT );
        
        var x = Math.random()*500;
        while(x < 100){
            x = Math.random()*500;
        }
        ball.setPosition( new cc.Point( x , 400 ) );
        
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

        if(keyCode == cc.KEY.space){
            this.shoot = true;
        }
        if(keyCode == cc.KEY.right){
            this.turnLeft = false;
            this.turnRight = true;
            
        }
        if(keyCode == cc.KEY.left){
            this.turnRight = false;
            this.turnLeft = true;
            
        }
        
    },

    checkRuning: function(){
        if(!this.human.isRunning){
            this.animation();
            this.human.isRunning = true;
        }
    },

    onKeyUp: function( keyCode , event ){
        
        if(keyCode == cc.KEY.space){
            this.shoot = false;
        }
        if(keyCode == cc.KEY.right){
            this.turnRight = false;
        }
        if(keyCode == cc.KEY.left){
            this.turnLeft = false;
        }
        
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
        this.hp.setScaleX(life/1000);
        this.countTime();

        if( timer%10 == 0 && gameTime ){
            this.createBigBall();
            gameTime = false;
        }
        if( timer%30 == 0 && timer != 0){
            timeRate++;
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
        
        var humanPos = this.human.getPosition();
        this.onKeyDown();
        
        if( this.shoot && numberOfBullet == 0){
            this.shooting( humanPos );
        }
        
        if( this.turnRight ){
            this.human.direction = Human.DIR.RIGHT;
            this.checkRuning();
        }
        if( this.turnLeft ){
            this.human.direction = Human.DIR.LEFT;
            this.checkRuning();
        }
        
        if( isDecreaseLife ){
            life--;
            isDecreaseLife = false;
            console.log(life);
        }
        if( life <= 0 ){
            console.log('Game over')
        }

    },
    
    countTime: function(){
        time += timeRate;
        if(time%30 == 0){
            timer++;
            gameTime = true;
        }
    }

});
var timer = 0;
var timeRate = 1;
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});