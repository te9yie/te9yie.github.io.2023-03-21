import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "posts");
const GEN_DIR = path.join(process.cwd(), "gen");
const LINKS_FILE = path.join(GEN_DIR, "links.json");
const DATE_FILE = path.join(GEN_DIR, "date.json");

export const getAllPostIds = () => {
  const linksJson = JSON.parse(fs.readFileSync(LINKS_FILE, "utf8"));
  return linksJson.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
};

export const getSortedCreatePostIds = () => {
  return JSON.parse(fs.readFileSync(DATE_FILE, "utf8")).sort((a, b) => {
    return a.create_at < b.create_at ? 1 : -1;
  });
};

export const getSortedUpdatePostIds = () => {
  return JSON.parse(fs.readFileSync(DATE_FILE, "utf8")).sort((a, b) => {
    return a.update_at < b.update_at ? 1 : -1;
  });
};

export const getPostData = (id) => {
  const dateJson = JSON.parse(fs.readFileSync(DATE_FILE, "utf8"));
  const linksJson = JSON.parse(fs.readFileSync(LINKS_FILE, "utf8"));
  const dateData = dateJson.find((data) => data.id === id);
  const linkData = linksJson.find((post) => post.id === id);
  const filePath = path.join(POSTS_DIR, `${id}.md`);
  const content = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  const create_at = dateData?.create_at ?? null;
  const update_at = dateData?.update_at ?? null;
  const refLinks = linkData?.refLinks ?? [];
  const links = linkData?.links ?? [];
  return {
    id,
    content,
    create_at,
    update_at,
    refLinks,
    links,
  };
};
