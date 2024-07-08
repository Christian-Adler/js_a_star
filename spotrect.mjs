import {Spot} from "./spot.mjs";

export class SpotRect extends Spot {
  constructor(pos) {
    super(pos);
  }

  draw(ctx, optColor = "white") {
    // ctx.lineWidth = 0.1;
    ctx.beginPath()
    ctx.rect(this.pos.x + 0.1, this.pos.y + 0.1, 0.8, 0.8);
    if (optColor) {
      ctx.fillStyle = optColor;
      ctx.fill();
    }
    // ctx.stroke();
  }
}
