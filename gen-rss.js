import fs from "fs";
import path from "path";
import { Feed } from "feed";
import { remark } from "remark";
import wikiLinkPlugin from "remark-wiki-link";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const SITE_URL = "https://te9yie.github.io";
const POSTS_DIR = path.join(process.cwd(), "posts");
const GEN_DIR = path.join(process.cwd(), "gen");
const OUT_DIR = path.join(process.cwd(), "out");
const DATE_FILE = path.join(GEN_DIR, "date.json");
const RSS_FILE = path.join(OUT_DIR, "rss.xml");

const getSortedPostsData = (n) => {
  return JSON.parse(fs.readFileSync(DATE_FILE, "utf8"))
    .sort((a, b) => {
      return a.update_at < b.update_at ? 1 : -1;
    })
    .slice(0, n);
};

const genRss = () => {
  const posts = getSortedPostsData(5);
  const feed = new Feed({
    title: "te9yie",
    description: "te9yie.github.io",
    link: SITE_URL,
  });
  posts.forEach((data) => {
    const content = fs.readFileSync(
      path.join(POSTS_DIR, `${data.id}.md`),
      "utf8"
    );
    const contentHtml = remark()
      .use(remarkGfm)
      .use(wikiLinkPlugin, {
        pageResolver: (name) => [name],
        hrefTemplate: (link) => `/${link}`,
      })
      .use(remarkHtml)
      .processSync(content).value;
    const link = encodeURI(`${SITE_URL}/${data.id}`);
    const published = new Date(Date.parse(data.update_at));
    feed.addItem({
      title: data.id,
      description: data.id,
      link,
      published,
      content: contentHtml,
    });
  });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(RSS_FILE, feed.rss2());
};

genRss();
