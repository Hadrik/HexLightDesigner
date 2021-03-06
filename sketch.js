let hexagons, held, count, nearestHexagon, patternSize = 100, showCircle = false;
let radius = 20;
const xSize = window.innerWidth;
const ySize = window.innerHeight;

function setup() {
  count = 0;
  createCanvas(xSize, ySize);
  hexagons = [];

  const overlap = radius - (radius * sin(degrees(60)));
  
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
  if (showCircle) {
    stroke('red');
    circle(xSize / 2, ySize / 2, patternSize * 2);
  }
  document.title = `Hexagons: ${count}`;
  //line(nearestHexagon.x, nearestHexagon.y, mouseX, mouseY);
}

function mousePressed() {
  if (!nearestHexagon.light) {
    nearestHexagon.light = true;
    count++;
  } else {
    nearestHexagon.light = false;
    count--;
  }
}

function keyPressed(e) {
  switch (e.key) {
    case 'c':
      clr();
      break;
    case 'l':
      hexagons.forEach(h => {
        h.white = !h.white;
      });
      break;
    case 'g':
      generatePattern(patternSize);
      break;
    case '+':
      patternSize += 25;
      break;
    case '-':
      patternSize -= 25;
      break;
    case 'h':
      showCircle = !showCircle;
      break;
    case 'ArrowUp':
      radius += 10;
      setup();
      break;
    case 'ArrowDown':
      if (radius > 10 + 10) radius -= 10;
      setup();
      break;
  }
}

function generatePattern(size, x = xSize/2, y = ySize/2) {
  clr();
  hexagons.forEach(h => {
    let distance = h.distanceToPoint(x, y);
    distance = (Math.max(0, (size - distance))) / size;
    if (random(0, 1) < distance) {
      h.light = true;
      count++;
    }
  });
}

function clr() {
  hexagons.forEach(h => {
    h.light = false;
  });
  count = 0;
}
