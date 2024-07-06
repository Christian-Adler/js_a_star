export class AStar {
  constructor(start, end) {
    this.openSet = [];
    this.closedSet = [];
    this.start = start;
    this.end = end;

    this.start.g = 0;
    this.openSet.push(start);

    this.shortestPathToAct = null;
    this.shortestPathToEnd = null;
  }

  heuristicCostEstimate(spot) {
    // return spot.manhattenDistanceToSpot(this.end);
    return spot.distanceToSpot(this.end);
  }

  constructPath(spot) {
    const path = [];
    let current = spot;
    while (current) {
      path.push(current);
      current = current.prevSpot;
    }
    path.reverse();
    return path;
  }

  next() {
    if (this.shortestPathToEnd)
      return; // already calculated

    if (this.openSet.length > 0) {
      let minFIdx = 0;
      let minFSpot = this.openSet[0];
      for (let i = 0; i < this.openSet.length; i++) {
        const spot = this.openSet[i];
        if (spot.f < minFSpot.f) {
          minFSpot = spot;
          minFIdx = i;
        }
      }

      if (minFSpot === this.end) {
        console.log('Found path to end');
        this.shortestPathToEnd = this.constructPath(minFSpot);
        this.shortestPathToAct = null;
        return;
      }
      this.shortestPathToAct = this.constructPath(minFSpot);

      this.openSet.splice(minFSpot, 1);
      this.closedSet.push(minFSpot);

      const neighbours = minFSpot.getNeighbours();
      for (const neighbour of neighbours) {
        if (this.closedSet.includes(neighbour))
          continue; // already done

        const tentativeGScore = minFSpot.g + minFSpot.distanceToSpot(neighbour);
        if (tentativeGScore >= neighbour.g)
          continue; // not a better path

        if (!this.openSet.includes(neighbour))
          this.openSet.push(neighbour);

        neighbour.g = tentativeGScore;
        neighbour.h = this.heuristicCostEstimate(neighbour);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.prevSpot = minFSpot;
      }
    }
  }

  draw(ctx) {
    for (const spot of this.closedSet) {
      spot.draw(ctx, 'red');
    }
    for (const spot of this.openSet) {
      spot.draw(ctx, 'green');
    }
    if (this.shortestPathToAct) {
      for (const spot of this.shortestPathToAct) {
        spot.draw(ctx, 'purple');
      }
    }
    if (this.shortestPathToEnd) {
      for (const spot of this.shortestPathToEnd) {
        spot.draw(ctx, 'blue');
      }
    }
  }

}