import {Vector} from "./vector.mjs";
import {World} from "./world.mjs";
import {SpotHex} from "./spothex.mjs";

export class WorldHex extends World {
  constructor() {
    super();
    this.cols = 50;
    this.rows = 50;
    this.grid = new Map();

    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        const spotHex = new SpotHex(new Vector(c, r));
        this.grid.set(spotHex.getKey(), spotHex);
      }
    }

    for (let i = 0; i < this.cols * this.rows / 2.5; i++) {
      const col = Math.floor(Math.random() * this.cols);
      const row = Math.floor(Math.random() * this.rows);
      if (col === this.cols - 1 && row === this.rows - 1 || col === 0 && row === 0)
        continue;
      this.grid.delete(new Vector(col, row).toString());
    }

    // find neighbours
    for (const key of this.grid.keys()) {
      const actSpot = this.grid.get(key);
      const actVec = actSpot.pos;

      for (const y of [-1, 1]) {
        const neighbourVec = new Vector(0, y).addVec(actVec);
        const neighbour = this.grid.get(neighbourVec.toString());
        if (neighbour)
          actSpot.addNeighbour(neighbour);
      }

      for (const x of [-1, 1]) {
        const yValues = actSpot.pos.x % 2 === 0 ? [-1, 0] : [0, 1];
        for (const y of yValues) {
          const neighbourVec = new Vector(x, y).addVec(actVec);
          const neighbour = this.grid.get(neighbourVec.toString());
          if (neighbour)
            actSpot.addNeighbour(neighbour);
        }
      }
    }
  }

  getSpot(x, y) {
    return this.grid.get(new Vector(x, y).toString());
  }

  getStart() {
    return this.getSpot(0, 0);
  }

  getEnd() {
    return this.getSpot(this.cols - 1, this.rows - 1);
  }

  scale(ctx, worldWidth, worldHeight) {
    ctx.scale(worldWidth / ((this.cols - 1) * SpotHex.xStep + 2 * SpotHex.r), worldHeight / ((this.rows + 0.5) * SpotHex.height));
    ctx.translate(SpotHex.r, SpotHex.r * Math.sin(SpotHex.a));
  }

  draw(ctx) {
    for (const spot of this.grid.values()) {
      spot.draw(ctx);
    }
  }
}