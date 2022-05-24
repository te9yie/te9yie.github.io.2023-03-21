import fs from "fs";
import path from "path";
import pkg from "canvas";
import { execSync } from "child_process";
const { createCanvas } = pkg;

const GEN_DIR = path.join(process.cwd(), "gen");
const OUT_DIR = path.join(process.cwd(), "out");
const DATE_FILE = path.join(GEN_DIR, "date.json");
const GRASS_FILE = path.join(OUT_DIR, "grass.png");

const box_r = 10;
const week_n = 52;
const active_color = "#0a8";
const inactive_color = "#ccc";
const width = box_r * (week_n + 2);
const height = box_r * 7;

const getDateListFromGit = () => {
  return execSync(`git log --pretty="%ad" --date=format:"%Y-%m-%d" |uniq`)
    .toString()
    .split(/\n/)
    .filter((s) => s.length > 0);
};
const getDateListFromPosts = () => {
  const dateJson = JSON.parse(fs.readFileSync(DATE_FILE, "utf8"));
  return dateJson
    .map((data) => [
      data.create_at.substring(0, 10),
      data.update_at.substring(0, 10),
    ])
    .flat()
    .filter((date, i, self) => self.indexOf(date) === i);
};

const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");
//const dateList = getDateListFromGit();
const dateList = getDateListFromPosts();

let now = new Date();
let month = (now.getMonth() + 1).toString().padStart(2, 0);
let date = now.getDate().toString().padStart(2, 0);
let today_str = `${now.getFullYear()}-${month}-${date}`;
let today = new Date(today_str);

const draw_box = (ctx, x, y) => {
  let dx = x * box_r;
  let dy = y * box_r;
  ctx.fillRect(dx + 1, dy + 1, box_r - 2, box_r - 2);
};

const draw_grass = (ctx, dateList) => {
  let indices = dateList.map((date) => {
    let diff = (today - new Date(date)) / (24 * 60 * 60 * 1000);
    return diff;
  });

  let index = 0;

  let x = week_n + 1;
  for (let y = today.getDay(); y >= 0; --y) {
    ctx.fillStyle = indices.includes(index++) ? active_color : inactive_color;
    draw_box(ctx, x, y);
  }
  for (--x; x >= 0; --x) {
    for (let y = 7 - 1; y >= 0; --y) {
      ctx.fillStyle = indices.includes(index++) ? active_color : inactive_color;
      draw_box(ctx, x, y);
    }
  }
};

draw_grass(ctx, dateList);

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(GRASS_FILE, canvas.toBuffer("image/png"));
