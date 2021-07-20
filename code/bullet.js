function Bullet(playerCords){
    this.cord = createVector(playerCords.x, playerCords.y);
    this.strokeC = "red";
    this.strokeW = 6;
    this.velY = 7;
    this.isAlive = true;

    this.render = function (){
        push();
        stroke(this.strokeC);
        strokeWeight(this.strokeW);
        point(this.cord.x, this.cord.y);
        pop();
    }

    this.move = function (){
        this.cord.y -= this.velY;    
    }

    this.makeOutOfScreenDead = function (){
        this.isAlive = this.cord.y > 0;
    }

    this.checkEnemyCollision = function (enemies){
        for(enem of enemies) {
            if(!enem.isAlive ) continue;

            let xCheck = isin(enem.cord.x, enem.cord.x + enem.size, this.cord.x);
            let yCheck = isin(enem.cord.y, enem.cord.y + enem.size, this.cord.y);
            
            if( xCheck && yCheck){
                enem.isAlive = false;
                this.isAlive = false;
                return true;
            }
        };
        return false;
    }
}