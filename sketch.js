let hexagons, lit = 0, nearestHexagon;
const radius = 60;

function setup() {
  createCanvas(screen.width, screen.height);
  hexagons = [];

  let overlap = radius - (radius * sin(degrees(60)));
  
  let move = false;
  for (let i = 0; i < height + radius; i += (2 * radius) - (2 * overlap)) {
    if (move) {
      for (let j = radius - (overlap / 2); j < width + radius; j += (2 * radius) - overlap) {
        hexagons.push(new Hexagon(j, i, radius));
      }
    } else {
      for (let j = 0; j < width + radius; j += (2 * radius) - overlap) {
        hexagons.push(new Hexagon(j, i, radius));
      }
    }
    move = !move;
  }
}

function draw() {
  background(5);
  hexagons.forEach(h => {
    h.render();
    if (nearestHexagon === undefined || h.distanceToMouse < nearestHexagon.distanceToMouse) {
      nearestHexagon = h;
    }
  });
  //line(nearestHexagon.x, nearestHexagon.y, mouseX, mouseY);

  document.title = lit;
}

function mousePressed() {
  if (!nearestHexagon.light) {
    nearestHexagon.light = true;
    lit++;
  } else {
    nearestHexagon.light = false;
    lit--;
  }
}

function keyPressed(e) {
  switch (e.key) {
    case 'c':
      hexagons.forEach(h => {
        h.light = false;
      });
      lit = 0;
      break;
    case 'l':
      hexagons.forEach(h => {
        h.white = !h.white;
      });
      break;
  }
}