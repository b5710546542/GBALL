var score = 0;
var gameTime = false;
var time = 0;
var timer = 0;
var timeRate = 1;
var numberOfBullet = 1;
var checkBullet = 20;
var life = 1000;
var isDecreaseLife = false;
var increaseBullet = false;
var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
 		this.setBackground = new cc.Sprite.create( 'res/images/bgg.png' );
        this.setBackground.setPosition( new cc.Point(screenWidth/2 , screenHeight/2) )
        this.addChild(this.setBackground);

        this.arrayBall = [];
        this.arraySmallBall = [];
        
        this.createHuman();
        this.createText();
        this.createHP();
        this.createScoreLabel();
        this.addKeyboardHandlers(); 
        this.setStart();
        this.createNumberBullet();
        this.scheduleUpdate();
        return true;
    },
    
    setStart: function(){
        this.hp.setScaleX(life/1000);
        this.human.setPosition( new cc.Point(100,45) );
        this.scoreLabel.setString( score );
        this.createBigBall();
        this.createBigBall();
        this.shoot = false;
        this.turnRight = false;
        this.turnLeft = false;
        
        score = 0;
        gameTime = false;
        time = 0;
        timer = 0;
        timeRate = 1;
        numberOfBullet = 1;
        checkBullet = 20;
        life = 500;
        isDecreaseLife = false;
        
        console.log(checkBullet);
    },
    
    createHP: function(){
        this.hp = new cc.Sprite.create( 'res/images/HP.png' );
        this.hp.setPosition( new cc.Point( 75 , 390  ));
        this.hp.setAnchorPoint(0,0);
        this.addChild( this.hp );
    },
    
    createHuman: function(){
        this.human = new Human();
        this.human.setPosition( new cc.Point(100,45) );
        this.addChild( this.human );
        this.human.scheduleUpdate();  
    },
    
    createScoreLabel: function(){
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 730, 400 ) );
        this.addChild( this.scoreLabel );
    },
    
    createText: function(){
        this.scoreText = new cc.Sprite.create( 'res/images/GameScore.png' );
        this.scoreText.setPosition( new cc.Point( 700 , 400 ) );
        this.addChild( this.scoreText );
        
        this.bulletText = new cc.Sprite.create( 'res/images/TabBullet.png' );
        this.bulletText.setPosition( new cc.Point( 520 , 400 ) );
        this.addChild( this.bulletText );
        
        this.backHP = new cc.Sprite.create( 'res/images/BackHP.png' );
        this.backHP.setPosition( new cc.Point( 10 , 380 ) );
        this.backHP.setAnchorPoint(0,0);
        this.addChild( this.backHP );
    },
    
    createNumberBullet: function(){
        this.numberBullet = cc.LabelTTF.create( '0' , 'Arial' , 40);
        this.numberBullet.setPosition( new cc.Point( 550 , 400 ) );
        this.addChild( this.numberBullet );
        this.numberBullet.setString( checkBullet );
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
        checkBullet--;
        this.numberBullet.setString( checkBullet );
    },

    createBullet: function( humanPos ){
        this.bullet = new Bullet(this.arrayBall , this.arraySmallBall);
        this.bullet.setPosition( new cc.Point( humanPos.x , 50) );
        this.addChild( this.bullet );
        this.bullet.scheduleUpdate();
    },

    update :function(dt){
        this.hp.setScaleX(life/500);
        this.countTime();
        this.checkTime();
        this.updateScore();  
        this.onKeyDown();
        this.checkButton();
        this.checkLife();
    },
    
    updateScore: function(){
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
    
    checkButton: function(){
        var humanPos = this.human.getPosition();
        
        if( this.shoot && numberOfBullet == 1 && checkBullet > 0 && checkBullet <= 20 ){
            this.shooting( humanPos );
            numberOfBullet = 0;
            console.log(checkBullet);
        }
        if( this.turnRight ){
            this.human.direction = Human.DIR.RIGHT;
            this.checkRuning();
        }
        if( this.turnLeft ){
            this.human.direction = Human.DIR.LEFT;
            this.checkRuning();
        }
    },
    
    checkLife: function(){
        if( isDecreaseLife ){
            life--;
            isDecreaseLife = false;
        }
        if( life <= 0 ){
            cc.director.runScene(new EndScene());
        }
    },
    
    checkTime: function(){
        if( timer%10 == 0 && gameTime ){
            this.createBigBall();
            gameTime = false;
        }
        if( timer%30 == 0 && timer != 0){
            timeRate++;
        }
        if( timer%5 == 0 && increaseBullet ){
            if(checkBullet < 20){
                checkBullet += 1;
                    if(checkBullet < 20){
                        checkBullet += 1;
                    }
                this.numberBullet.setString(checkBullet);
            }
            increaseBullet = false;
            console.log('increase bullet');
        }
    },
    
    countTime: function(){
        time += timeRate;
        if(time%30 == 0){
            timer++;
            gameTime = true;
            increaseBullet = true;
        }
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