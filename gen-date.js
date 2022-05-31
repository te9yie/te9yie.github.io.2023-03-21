import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const POSTS_DIR = path.join(process.cwd(), "posts");
const GEN_DIR = path.join(process.cwd(), "gen");
const GEN_FILE = path.join(GEN_DIR, "date.json");

const list = fs.readdirSync(POSTS_DIR).map((file) => {
  const filePath = path.join("posts", file);
  const create_at = execSync(
    `git log --pretty="%ad" --date=format:"%Y-%m-%d %H:%M:%S" -- "${filePath}" | tail -1`
  )
    .toString()
    .trim();
  if (!create_at) {
    let now = new Date();
    let month = (now.getMonth() + 1).toString().padStart(2, 0);
    let date = now.getDate().toString().padStart(2, 0);
    let hour = now.getHours().toString().padStart(2, 0);
    let minute = now.getMinutes().toString().padStart(2, 0);
    let sec = now.getSeconds().toString().padStart(2, 0);
    let now_str = `${now.getFullYear()}-${month}-${date} ${hour}:${minute}:${sec}`;
    return {
      id: file.replace(/\.md$/, ""),
      create_at: now_str,
      update_at: now_str,
    };
  }
  const update_at = execSync(
    `git log -1 --pretty="%ad" --date=format:"%Y-%m-%d %H:%M:%S" -- "${filePath}"`
  )
    .toString()
    .trim();
  return {
    id: file.replace(/\.md$/, ""),
    create_at,
    update_at,
  };
});

fs.mkdirSync(GEN_DIR, { recursive: true });
fs.writeFileSync(GEN_FILE, JSON.stringify(list));
