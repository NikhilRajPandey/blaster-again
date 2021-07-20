let plr; // Player
let enems = []; // Enemeis
let bullets = [];
let noOfenems = 3;
let incScore = 5;
let gameOverReasons = ["Reason: Collide with wall" , "Reason: Collide with enemey"];
let gameOverReason = -1;
let plrScore;
let isGameOver;

// Utility Function
function isin(a,b,c){
    /* Returns if c is between a,b or not*/
    return (min(a,b) <= c) && (max(a,b) >= c);
}
function setupGame(){
    plrScore = 0;
    isGameOver = false;
    plr = new Player();
    for(let i = 0; i < noOfenems; i++){ // Creating enemy object
        enems.push(new Enemy());
    }
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    setupGame();
}

function keyPressed() {
    plr.handleKey(keyCode);
    if(key == ' '){
        bullets.push(new Bullet(plr.cord));
    }

    // If gameOver and player click any button then replay game
    if(isGameOver){
        setupGame();
    }
}
function gameOver(){
    textAlign(CENTER);
    textSize(72);
    textStyle(BOLD);
    fill("red");
    text("GAME OVER",width/2, height/2 - 100);

    textSize(48);
    fill("black");
    text(gameOverReasons[gameOverReason],width/2, height/2);
}
function doGameOver(reason){
    isGameOver = true;
    gameOverReason = reason;
    enems = [];
    bullets = [];
}
function showScore(){
    textSize(48);
    fill("black");
    textStyle(BOLD);
    textAlign(LEFT);

    let displayScore = "Score: " + plrScore;
    text(displayScore,width - 50 - textWidth(displayScore), 50);
}
function runGame(){
    plr.render();
    plr.move(); 

    enems.forEach(enem => {
        enem.render();
        enem.move();
        enem.resetIfRequired();

        if(enem.checkPlayerCollision(plr)) doGameOver(1);
    });

    bullets.forEach(_bullet => {
        _bullet.render();
        _bullet.move();
        _bullet.makeOutOfScreenDead();
        plrScore += incScore * _bullet.checkEnemyCollision(enems);
    });

    // Removing out dead bullets [OutOfscreen or those who hit the enemy]
    bullets = bullets.filter(_bullet => _bullet.isAlive);

    // Checks if player is out of screen or not and if it is then make gameover
    if( !isin(0,width,plr.cord.x)) doGameOver(0);
}

function draw() {
    background(120);
    showScore();

    if(isGameOver){
        gameOver();
    }
    else{
        runGame();
    }

}
