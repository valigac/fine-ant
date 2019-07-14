const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/* entities */
const ants = [];
const sugar = {
  size: 40,
  color: 'white',
  x: undefined,
  y: undefined,
}

const hole = {
  color: '#4f4f4f',
  x: 0,
  y: 0,
  radius: 30
}

const area = {
  lines: [],
  actualLine: null,
  width: undefined,
  height: undefined,
  sugar: sugar,
  hole: hole
}

const neighborhood = {
  color: '#FC766A',
  size: undefined,
}

/* DRAWING */
function drawObject(x, y, width, height, rad, startX, startY, color) {
  ctx.save();
  ctx.translate(startX, startY);
  ctx.rotate(rad);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.restore();
}

function updateDefault() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI*2);
  ctx.fillStyle = hole.color;
  ctx.fill(); // hole
  let n = neighborhood.size;
  ctx.fillStyle = neighborhood.color;
  ctx.fillRect(sugar.x + sugar.size / 2 - n, sugar.y + sugar.size / 2 - n,
    n * 2, n * 2); // sugar's neighborhood
  ctx.fillStyle = sugar.color;
  ctx.fillRect(sugar.x, sugar.y, sugar.size, sugar.size); // sugar
  ctx.closePath();
}

function update() {
  updateDefault();
  /* DRAW ANT */
  ants.forEach((a) => {
    a.move();
    drawObject(-2, a.y + 10, a.width + 4, a.height - 10, a.rad, a.start.x, a.start.y, a.color);
    drawObject(1.5, a.y - 4, a.width - 3, a.height - 7, a.rad, a.start.x, a.start.y, a.color);
    drawObject(-2, a.y - 20, a.width + 4, a.height - 5, a.rad, a.start.x, a.start.y, a.color);
    drawObject(-1, a.y + 21, 2, a.height - 12, a.rad, a.start.x, a.start.y, a.color);
    drawObject(a.width - 1, a.y + 21, 2, a.height - 12, a.rad, a.start.x, a.start.y, a.color);
  });
  /* DRAW LINES */
  area.lines.forEach((line, i) => {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0,0,0,0.05)';
    ctx.moveTo(0, 0);
    line.forEach((point, index) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
    ctx.closePath();
  });
}

function startExperiment(antCount, width, height, n) {
  canvas.width = width;
  canvas.height = height;

  neighborhood.size = n;
  area.height = height;
  area.width = width;
  sugar.x = width - 50;
  sugar.y = height - 50;
  for (let i = 0; i < antCount; i++) {
    setTimeout(() => {
      ants.push(new Ant(randomColor(), 0, 0, 10, 20, 1, area, n))
    }, i * 1000);
  }
  setInterval(update, 10);
}

startExperiment(10, 700, 900, 100);
