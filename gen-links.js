const fs = require("fs");
const path = require("path");
const remark = require("remark");
const { wikiLinkPlugin } = require("remark-wiki-link");

const POSTS_DIR = path.join(process.cwd(), "posts");
const GEN_DIR = path.join(process.cwd(), "gen");
const GEN_FILE = path.join(GEN_DIR, "links.json");

const getWikiLinks = (content) => {
  const { parse } = remark().use(wikiLinkPlugin);
  const ast = parse(content);

  let links = new Array();

  const walk = (node, callback) => {
    callback(node);
    (node.children || []).forEach((child) => walk(child, callback));
  };
  walk(ast, (node) => {
    if (node.type === "linkReference") {
      links.push(node.label);
    }
  });

  return links.filter((link, i, self) => self.indexOf(link) === i);
};

let posts = new Map();

fs.readdirSync(POSTS_DIR).forEach((fileName) => {
  const id = fileName.replace(/\.md$/, "");
  if (!posts.has(id)) {
    posts.set(id, new Map());
  }
  const filePath = path.join(POSTS_DIR, fileName);
  const content = fs.readFileSync(filePath, "utf8");
  const links = getWikiLinks(content);
  if (links.length > 0) {
    posts.get(id).set("links", links);
    links.forEach((link) => {
      if (!posts.has(link)) {
        posts.set(link, new Map());
      }
      const refPost = posts.get(link);
      if (!refPost.has("refLinks")) {
        refPost.set("refLinks", new Array());
      }
      refPost.get("refLinks").push(id);
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
          .filter((link) => link != key)
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
