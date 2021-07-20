function LIntersec(point1,point2,point3,point4){
    this.orientation = function(point1,point2,point3){
        // https://www.geeksforgeeks.org/orientation-3-ordered-points/
        let a = (point2.y - point1.y) * (point3.x - point2.x);
        let b = (point3.y - point2.y) * (point2.x - point1.x);
        
        if(b - a == 0) return 0; // Collinear
        return (b - a > 0) ? 1 : 2; // clock or counterclock wise
    }
    this.onSegment = function(point1,point2,point3){
        /* Checks if point3 is on line made by point1 and point2 given that 
        all points are collinear */
        let xCheck = (max(point1.x,point2.x) >= point3.x) && (min(point1.x,point2.x) <= point3.x);
        let yCheck = (max(point1.y,point2.y) >= point3.y) && (min(point1.y,point2.y) <= point3.y);

        return (xCheck && yCheck);
    }

    // Reference Link: https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
    let orient1 = this.orientation(point1,point2,point3);
    let orient2 = this.orientation(point1,point2,point4);
    let orient3 = this.orientation(point3,point4,point1);
    let orient4 = this.orientation(point3,point4,point2);
    
    // Intersection Case
    if(orient1 != orient2 && orient3 != orient4){
        return true;
    }

    // Special Case
    if(orient1 == 0 && this.onSegment(point1,point2,point3)) return true;
    if(orient2 == 0 && this.onSegment(point1,point2,point4)) return true;
    if(orient3 == 0 && this.onSegment(point3,point4,point1)) return true;
    if(orient4 == 0 && this.onSegment(point3,point4,point2)) return true;

    return false;
}