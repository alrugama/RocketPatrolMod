class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
    }

    update(){
        /*
        //random direction
        this.direct = Math.floor(Math.random() * 2);
        if(this.direct == 0){
            //Move spaceship left
            this.x += this.moveSpeed;
        }else{
            //Move spaceship left
            this.x -= this.moveSpeed;
        }*/
        //Move spaceship left
        this.x -= this.moveSpeed;

        //Wrap around from left edge to the right edge
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }
}