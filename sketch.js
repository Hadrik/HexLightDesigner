let hexagons, held, nearestHexagon;
const radius = 20;
const xSize = 400;
const ySize = 400;

function setup() {
  createCanvas(xSize, ySize);
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
}

function mousePressed() {
  if (!held) {
      nearestHexagon.light = !nearestHexagon.light;
      held = true;
    }
  held = false;
}

function keyPressed(e) {
  switch (e.key) {
    case 'c':
      hexagons.forEach(h => {
        h.light = false;
      });
      break;
    case 'l':
      hexagons.forEach(h => {
        h.white = !h.white;
      });
      break;
    case 'g':
      generatePattern(100);
      break;
  }
}

function generatePattern(size, x = xSize/2, y = ySize/2) {
  hexagons.forEach(h => {
    let distance = h.distanceToPoint(x, y);
    distance = (Math.max(0, (size - distance))) / size;
    if (random(0, 1) < distance) {
      h.light = true;
    }
  });
}