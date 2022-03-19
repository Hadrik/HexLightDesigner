class Hexagon {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.light = false;
    this.white = true;
  }
  
  render() {
    colorMode(HSB);
    textAlign(CENTER, CENTER);
    if (this.light) {
      if (this.white) {
        fill(0, 0, 100);
      } else {
        fill((millis() / 80) % 360, 100, 50);
      }
    } else {
      noFill();
    }
    stroke(1);
    strokeWeight(3);
    
    beginShape();
    for (let i = 0; i < 2 * PI; i += PI / 3) {
      let nx = sin(i) * this.radius;
      let ny = cos(i) * this.radius;
      vertex(this.x + nx, this.y + ny);
    }
    endShape(CLOSE);
    
    strokeWeight(1);
    //circle(this.x, this.y, this.radius * 2);
    //text(this.name, this.x, this.y);
  }
  
  get distanceToMouse() {
    return this.distanceToPoint(mouseX, mouseY);
  }
  
  distanceToPoint(x, y) {
    return dist(x, y, this.x, this.y);
  }
}