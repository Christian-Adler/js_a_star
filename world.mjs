import {Spot} from "./spot.mjs";
import {Vector} from "./vector.mjs";

export class World {
  constructor() {
    this.cols = 150;
    this.rows = 50;
    this.grid = new Array(this.cols);

    for (let i = 0; i < this.cols; i++) {
      this.grid[i] = new Array(this.rows);
    }

    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        this.grid[c][r] = new Spot(new Vector(c, r));
      }
    }

    for (let i = 0; i < this.cols * this.rows / 2.5; i++) {
      const col = Math.floor(Math.random() * this.cols);
      const row = Math.floor(Math.random() * this.rows);
      if (col === this.cols - 1 && row === this.rows - 1 || col === 0 && row === 0)
        continue;
      this.grid[col][row] = undefined;
    }

    // find neighbours
    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        const actSpot = this.grid[c][r];
        if (!actSpot)
          continue;

        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0)
              continue;
            let spot = this.getSpot(c + x, r + y);
            if (spot)
              actSpot.addNeighbour(spot);
          }
        }
      }
    }
  }

  getSpot(x, y) {
    const col = this.grid[x];
    if (!col) return null;
    return col[y];
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
        const col = this.grid[c];
        if (!col) continue;
        const spot = col[r];
        if (!spot) continue;
        spot.draw(ctx);
      }
    }
  }
}