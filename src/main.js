let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play]
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//Reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

////////////////////////////////////////
// Name: Alex Rugama
// Project: Rocket Partol Mod 
// Date: 07/01/2021
// Time: About 15 hours to complete
//
//---------------- Points breakdown------------------------------------------------------
// 1)trackes High score: 5 points
// 2)Created my own backgound music: 5 points
// 3)Implemented speed increase after 30 second: 5 points
// 4)New scrolling background 5 points
// 5)Allows player to control rocket: 5 points
// 6)Four new sfx that are randomized: 10 points
// 7)Displaying time at the top of the screen: 10 points
// 8)Created new faster and smaller enemy: 20 points
// 9)All new artwork and animations for game assets: 20 points
// total points 85 + 20 for tutorial completion 