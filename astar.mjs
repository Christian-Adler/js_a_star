export class AStar {
  constructor(start, end) {
    this.openSet = [];
    this.closedSet = [];
    this.start = start;
    this.end = end;

    this.openSet.push(start);
  }

  next() {
    if (this.openSet.length > 0) {

    } else {
      // no solution
      return false;
    }
  }

  draw(ctx) {
    for (const spot of this.closedSet) {
      spot.draw(ctx, 'red');
    }
    for (const spot of this.openSet) {
      spot.draw(ctx, 'green');
    }
  }

}