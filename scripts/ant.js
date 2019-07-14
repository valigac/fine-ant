function Ant(color, x, y, width, height, speed, area, n) {
  this.color = color;
  this.x = x;
  this.y = y;
  this.n = n;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.area = area;
  this.loc = null;
  this.line = null;
  this.start = { x: x, y: y };
  this.target = { x: random(0, area.width), y: random(0, area.height) };
  this.chooseTarget = (x, y) => {
    this.start.x = this.target.x;
    this.start.y = this.target.y;
    this.target.x = x;
    this.target.y = y;
    this.y = 0;
  };
  this.getReturnPath = () => {
    let sugar = this.area.sugar;
    let hole = this.area.hole;
    let line = [];
    let length = Math.sqrt(Math.pow(sugar.x - hole.x, 2) + Math.pow(sugar.y - hole.y, 2));
    let angle = ((sugar.y - hole.y) / length);
    for (let i = 0; i <= length; i++) {
      if (i % 2 != 0) {
        continue;
      }
      let rotated = pointRotate(0, 0, line.length, Math.sin(i), Math.asin(angle));
      line.push({ x: rotated.x * 20, y: rotated.y * 20 });
      if (rotated.x * 20 > sugar.x)
        break;
    }
    return line;
  };
  this.move = () => {
    let a = this.target.x - this.start.x;
    let b = this.target.y - this.start.y;
    let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    this.y += this.speed;
    this.rad = Math.atan2(b, a) - Math.PI / 2;
    let sugar = this.area.sugar;
    /* RETURN */
    if (this.return) {
      if (Math.round(this.y) == Math.round(c)) {
        this.loc--;
        if (Math.random() > 0.5 && (this.loc !== 0)) {
          this.line.splice(this.loc, 1);
          this.loc--;
        }
        let newTarget = this.line[this.loc];
        this.chooseTarget(newTarget.x, newTarget.y);
        if (this.loc == 0) {
          this.return = false;
          this.area.lines.push(this.line.slice());
          if (this.line.length < this.area[this.area.lines.length - 2]) {
            this.area.actualLine = this.area.lines.length - 1;
          } else if (this.area.lines.length - 2 > 0) {
            this.area.actualLine = this.area.lines.length - 2;
          }
        }
      }
      return;
    }

    if (Math.round(this.y) == Math.round(c)) {
      /* SUGAR FOUND */
      if ((this.target.x >= sugar.x && this.target.x <= sugar.x + sugar.size)
        && (this.target.y >= sugar.y && this.target.y <= sugar.y + sugar.size)) {
          this.return = true;
          if (!this.area.lines.length) {
            this.line = this.getReturnPath();
            this.area.actualLine = 0;
          } else {
            this.line = this.area.lines[this.area.actualLine].slice();
          }
          this.loc = this.line.length - 1;
          let newTarget = this.line[this.loc];
          this.chooseTarget(newTarget.x, newTarget.y);

        return;
      }
      let nX = sugar.x + sugar.size / 2 - this.n;
      let nY = sugar.y + sugar.size / 2 - this.n;
      if (this.target.x >= nX && this.target.x <= nX + this.n * 2
        && this.target.y >= nY && this.target.y <= nY + this.n * 2) {
          this.chooseTarget(sugar.x + sugar.size / 2, sugar.y + sugar.size / 2)
          return;
      }
      if (this.area.lines && this.area.lines.length) {
        let last = this.area.lines[0][this.area.lines[0].length - 1];
        this.chooseTarget(preferredRandom(0, area.width, last.x),
          preferredRandom(0, area.height, last.y));
      }
      else {
        this.chooseTarget(random(0, area.width), random(0, area.height));
      }
      return;
    }
  }
}
