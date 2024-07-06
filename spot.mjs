export class Spot {
  constructor(pos, f, g, h) {
    this.pos = pos;
    this.f = f;
    this.g = g;
    this.h = h;
  }

  draw(ctx, optColor) {
    ctx.lineWidth = 0.1;
    ctx.beginPath()
    ctx.rect(this.pos.x, this.pos.y, 1, 1);
    if (optColor) {
      ctx.fillStyle = optColor;
      ctx.fill();
    }
    ctx.stroke();
  }
}
