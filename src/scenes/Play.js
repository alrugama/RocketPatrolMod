class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        // Load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('field', './assets/grassfield.png');
        this.load.image('bg', './assets/background.png');
        this.load.image('ufo', './assets/ufo.png');
        this.load.image('ufo2', './assets/ufo_2.png');

        //Audio track
        this.load.audio('sfx_soundtrack', './assets/soundtrack.wav')

        //Load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0,
        endFrame: 9});
    }
    
    create(){
        //Place tile sprite
        //this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        this.starfield = this.add.tileSprite(0, 0, 1280, 960, 'bg').setOrigin(0,0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);

        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        //add rocket(p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //Add spaceships(x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0, 0);

        //Add UFO enemy(x1)
        this.ufo = new Ufo(this, game.config.width, borderUISize*4, 'ufo2', 0, 40).setOrigin(0, 0);

        //Define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //Animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first:0}),
            frameRate: 30
        });

        //Initilize score
        this.p1Score = 0;
        //initialize high score
        this.p1HS = 0;

        //Display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score,
            scoreConfig);
        

        //GAME OVER flag
        this.gameOver = false;

        //60-sec play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu',
            scoreConfig).setOrigin(0.5);
            this.gameOver = true;

            //High score
            if(this.p1Score > this.p1HS){this.p1HS = this.p1Score;}
            this.add.text(game.config.width/2, game.config.height/2 - 64, 'High Score :' + this.p1HS, scoreConfig).setOrigin(0.5);
        }, null, this);

        //initilize the speed update
        this.speedUpdate = false;
                

        //Play soundtrack
        var music = this.sound.add('sfx_soundtrack');
        music.setLoop(true);
        music.play();

    }
    
    update(){
        this.starfield.tilePositionX -= 4;
        
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start('menuScene');
        }
        
        
        //Increase the ship movement speed
        if(this.clock.elapsed >= 30000 && !this.speedUpdate){
            this.ship01.moveSpeed += 1;
            this.ship02.moveSpeed += 1;
            this.ship03.moveSpeed += 1;
            this.ufo.moveSpeed += 1;
            this.speedUpdate = true;
        }
        
        //update enemy
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ufo.update();
        }

        //Check collision
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            //console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            //console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            //console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ufo)){
            //console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.ufo);
        }
    }

    checkCollision(rocket, ship){
        //Simple AABB checking
        if(rocket.x < ship.x + ship.width &&
             rocket.x + rocket.width > ship.x &&
             rocket.y < ship.y + ship.height &&
             rocket.height + rocket.y > ship.y){
                 return true;
             } else{
                 return false;
             }
    }

    shipExplode(ship){
        //Temp hide ship
        ship.alpha = 0;

        //Create explosion sprite at ship loc
        let boom = this.add.sprite(ship.x, ship.y, 'explosion'). setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () =>{
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //Score addition and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.rand = Math.floor(Math.random() * 4);
        if(this.rand == 0){
            this.sound.play('sfx_exp_01');
        }else if(this.rand == 1){
            this.sound.play('sfx_exp_02');
        }else if(this.rand == 2){
            this.sound.play('sfx_exp_03');
        }else{
            this.sound.play('sfx_exp_04');
        }
        //this.sound.play('sfx_explosion');/////////////////////////update
    }
}