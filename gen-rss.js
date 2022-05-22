import fs from "fs";
import path from "path";
import { Feed } from "feed";

const SITE_URL = "https://te9yie.github.io";
const GEN_DIR = path.join(process.cwd(), "gen");
const OUT_DIR = path.join(process.cwd(), "out");
const DATE_FILE = path.join(GEN_DIR, "date.json");
const RSS_FILE = path.join(OUT_DIR, "rss.xml");

const getSortedPostsData = (n) => {
  const dateJson = JSON.parse(fs.readFileSync(DATE_FILE, "utf8"));
  return dateJson.slice(0, 5);
};

const genRss = () => {
  const posts = getSortedPostsData(5);
  const feed = new Feed({
    title: "te9yie",
    description: "te9yie.github.io",
    link: SITE_URL,
  });
  posts.forEach((data) => {
    const link = encodeURI(`${SITE_URL}/${data.id}`);
    const published = new Date(Date.parse(data.update_at));
    feed.addItem({
      title: data.id,
      description: data.id,
      link,
      published,
    });
  });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(RSS_FILE, feed.rss2());
};

genRss();
