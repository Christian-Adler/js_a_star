export class Spot {
  constructor(pos) {
    this.pos = pos;
    this.neighbours = [];
    this.prevSpot = null;
    this.f = 0;
    this.g = Number.MAX_SAFE_INTEGER;
    this.h = 0;
  }

  addNeighbour(neighbour) {
    this.neighbours.push(neighbour);
  }

  getNeighbours() {
    return [...this.neighbours];
  }

  distanceToSpot(other) {
    return this.pos.distance(other.pos);
  }

  manhattenDistanceToSpot(other) {
    return this.pos.manhattenDistance(other.pos);
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
