import fs from "fs";
import path from "path";
import { remark } from "remark";
import wikiLinkPlugin from "remark-wiki-link";
import remarkGfm from "remark-gfm";

const POSTS_DIR = path.join(process.cwd(), "posts");
const GEN_DIR = path.join(process.cwd(), "gen");
const GEN_FILE = path.join(GEN_DIR, "links.json");

const getWikiLinks = (content, id) => {
  const { parse } = remark().use(remarkGfm).use(wikiLinkPlugin);
  const ast = parse(content);

  let links = new Array();

  const walk = (node, callback) => {
    callback(node);
    (node.children || []).forEach((child) => walk(child, callback));
  };
  walk(ast, (node) => {
    if (node.type === "wikiLink") {
      links.push(node.value);
    }
  });

  return links
    .filter((link, i, self) => self.indexOf(link) === i)
    .filter((link) => link !== id);
};

const getOrDefault = (map, key, value) => {
  if (!map.has(key)) {
    map.set(key, value);
  }
  return map.get(key);
};

let posts = new Map();

fs.readdirSync(POSTS_DIR).forEach((fileName) => {
  const id = fileName.replace(/\.md$/, "");
  const post = getOrDefault(posts, id, new Map());
  const filePath = path.join(POSTS_DIR, fileName);
  const content = fs.readFileSync(filePath, "utf8");
  const links = getWikiLinks(content, id);
  if (links.length > 0) {
    post.set("links", links);
    links.forEach((link) => {
      const refPost = getOrDefault(posts, link, new Map());
      getOrDefault(refPost, "refLinks", new Array()).push(id);
    });
  }
});

let jsonPosts = new Array();

posts.forEach((value, key) => {
  const postLinks = value.has("links") ? value.get("links") : [];
  const postRefLinks = value.has("refLinks") ? value.get("refLinks") : [];
  let links = new Array();
  postLinks.concat(postRefLinks).forEach((link) => {
    links.push(link);
    const next = posts.get(link);
    if (next.has("links")) {
      links.push(...next.get("links"));
    }
    if (next.has("refLinks")) {
      links.push(...next.get("refLinks"));
    }
  });
  links =
    links.length > 0
      ? links
          .filter((link, i, self) => self.indexOf(link) === i)
          .filter((link) => link !== key)
          .filter((link) => !postLinks.includes(link))
          .filter((link) => !postRefLinks.includes(link))
      : undefined;
  jsonPosts.push({
    id: key,
    refLinks: value.get("refLinks"),
    links,
  });
});

fs.mkdirSync(GEN_DIR, { recursive: true });
fs.writeFileSync(GEN_FILE, JSON.stringify(jsonPosts));
