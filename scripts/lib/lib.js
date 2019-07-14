function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function preferredRandom(min, max, preferred) {
  if (Math.random() > 0.8) {
    return preferred;
  }
  else
    return random(min, max);
}

function randomColor() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function pointRotate(a, b, x, y, rad) {
  rad = 2 * Math.PI - rad;
  let cos = Math.cos(rad);
  let sin = Math.sin(rad);
  return {
    x: ((x - a) * cos) + ((y - b) * sin) + a,
    y: ((y - b) * cos) - ((x - a) * sin) + b
  }
}
