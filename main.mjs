import {AStar} from "./astar.mjs";
import {WorldRect} from "./worldrect.mjs";
import {WorldHex} from "./worldhex.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let worldWidth = canvas.width;
let worldHeight = canvas.height;
let worldWidth2 = worldWidth / 2;
let worldHeight2 = worldHeight / 2;
let worldUpdated = true;

const updateWorldSettings = () => {
  if (worldHeight !== window.innerHeight || worldWidth !== window.innerWidth) {
    worldWidth = window.innerWidth;
    worldHeight = window.innerHeight;
    worldWidth2 = worldWidth / 2;
    worldHeight2 = worldHeight / 2;
    canvas.width = worldWidth;
    canvas.height = worldHeight;
    worldUpdated = true;
  }
};

updateWorldSettings();

const useRect = false;
const allowDiagonalInRect = true;
const world = useRect ? new WorldRect(allowDiagonalInRect) : new WorldHex();
const aStar = new AStar(world.getStart(), world.getEnd());

const slow = false;
let count = 0;

const update = () => {

  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;

  if (worldUpdated) {
    worldUpdated = false;
  }
  ctx.clearRect(0, 0, worldWidth, worldHeight);


  ctx.save();

  world.scale(ctx, worldWidth, worldHeight);
  world.draw(ctx);
  aStar.draw(ctx);

  ctx.restore();

  if (slow) {
    if (count > 5) {
      count = 0;
      aStar.next();
    }
    count++;
  } else
    aStar.next();

  updateWorldSettings();

  requestAnimationFrame(update);
}

update();