import {Spot} from "./spot.mjs";
import {Vector} from "./vector.mjs";

export class World {
  constructor() {
    this.cols = 5;
    this.rows = 5;
    this.grid = new Array(this.cols);

    for (let i = 0; i < this.cols; i++) {
      this.grid[i] = new Array(this.rows);
    }

    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        this.grid[c][r] = new Spot(new Vector(c, r));

      }
    }
  }

  getSpot(x, y) {
    return this.grid[x][y];
  }

  getStart() {
    return this.getSpot(0, 0);
  }

  getEnd() {
    return this.getSpot(this.cols - 1, this.rows - 1);
  }

  scale(ctx, worldWidth, worldHeight) {
    // const scale = Math.min(worldWidth / this.cols, worldHeight / this.rows);
    ctx.scale(worldWidth / this.cols, worldHeight / this.rows);
  }

  draw(ctx) {
    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        const spot = this.grid[c][r];
        spot.draw(ctx);
      }
    }
  }
}