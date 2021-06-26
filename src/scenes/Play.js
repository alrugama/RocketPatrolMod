class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    
    init() {

    }

    preload() {
        // Load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
    }
    
    create(){
        //Place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);

        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        //add rocket(p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'roccket').setOrigin(0.5, 0);

        //Define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.keyboard.KeyCodes.RIGHT);
    }
    
    update(){
        this.starfield.tilePositionX -= 4;
        this.p1Rocket.update();
    }
}