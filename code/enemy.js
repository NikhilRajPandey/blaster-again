function Enemy(){
    this.margin = 20;
    this.size = 50;
    this.bColor = "#6390AA";
    this.strokeC = "black";
    this.strokeW = 3;
    this.cord = createVector(int(random(
                                this.margin,
                                width  - this.size - this.margin)),
                            this.margin);
    this.velY = 6;
    this.isAlive = true;
    
    this.render = function (){
        if(this.isAlive){
            push();
            fill(this.bColor);
            stroke(this.strokeC);
            strokeWeight(this.strokeW);
            square(this.cord.x,this.cord.y,this.size);
            pop();
        }
    }

    this.move = function (){
        this.cord.y += this.velY;
    }
    
    this.resetIfRequired = function (){
        /* It will reset the Enemy block position if its outofscreen 
        and increase its velocity */
        if(this.cord.y > height){
            this.cord.y -= height;
            this.cord.x = random(this.margin, width  - this.size - this.margin);
            this.velY += 0.125;
            this.isAlive = true;
            
        }
    }

    this.checkPlayerCollision = function (plr){
        if(!this.isAlive) return false;
        
        /* Check collision with player */
        let leftPlayerPoint = createVector(plr.cord.x - plr.size/2 ,
                                           plr.cord.y + plr.size);
        let rightPlayerPoint = createVector(plr.cord.x + plr.size/2 ,
                                            plr.cord.y + plr.size);
        let leftEnemyPoint = createVector(this.cord.x, this.cord.y + this.size);
        let rightEnemyPoint = createVector(this.cord.x + this.size,
                                           this.cord.y + this.size);

        let leftcheck = LIntersec(leftEnemyPoint,rightEnemyPoint
                                  ,plr.cord,leftPlayerPoint);
        let rightCheck = LIntersec(leftEnemyPoint,rightEnemyPoint
                                   ,plr.cord,rightPlayerPoint);
        
        return leftcheck || rightCheck;
    }
}