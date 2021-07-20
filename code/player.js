function Player(){
    this.size = 50;
    this.margin = 20;
    this.bColor = "#4D0026"; // Border Color
    this.leftKey = LEFT_ARROW; // a
    this.rightKey = RIGHT_ARROW; // d
    this.strokeW = 3;
    this.cord = createVector(width/2,
                            height - this.size - this.margin);
    this.velX = 5;

    this.render = function() {
        push();
        noFill();
        stroke(this.bColor);
        strokeWeight(this.strokeW);
        translate(this.cord.x,this.cord.y);
        triangle(0,0,-this.size/2, this.size, this.size/2, this.size);
        pop();
    }

    this.move = function() {
        this.cord.x += this.velX;
    }

    this.handleKey = function(key){
        if(key == this.leftKey){
            plr.velX = -abs(plr.velX);
        }
        else if(key == this.rightKey){
            plr.velX = abs(plr.velX);
        }
    }
}