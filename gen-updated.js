import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const POSTS_DIR = path.join(process.cwd(), "posts");
const GEN_DIR = path.join(process.cwd(), "gen");
const GEN_FILE = path.join(GEN_DIR, "updated.json");

const list = fs.readdirSync(POSTS_DIR).map((file) => {
  const filePath = path.join("posts", file);
  const updated = execSync(
    `git log -1 --pretty="%ad" --date=format:"%Y-%m-%d %H:%M:%S" -- "${filePath}"`
  )
    .toString()
    .trim();
  return {
    id: file.replace(/\.md$/, ""),
    updated,
  };
});
list.sort((a, b) => {
  return a.updated < b.updated ? 1 : -1;
});

fs.mkdirSync(GEN_DIR, { recursive: true });
fs.writeFileSync(GEN_FILE, JSON.stringify(list));
