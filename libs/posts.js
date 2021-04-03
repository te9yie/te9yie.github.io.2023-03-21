import fs from "fs";
import path from "path";

const POST_DIR = path.join(process.cwd(), "posts");
const GEN_DIR = path.join(process.cwd(), "gen");
const LINKS_FILE = path.join(GEN_DIR, "links.json");
const UPDATED_FILE = path.join(GEN_DIR, "updated.json");

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

export const getSortedAllPostIds = () => {
  const updatedJson = JSON.parse(fs.readFileSync(UPDATED_FILE, "utf8"));
  return updatedJson
    .sort((a, b) => {
      return a.updated < b.updated ? 1 : -1;
    })
    .map((post) => {
      return {
        id: post.id,
        lastUpdate: post.updated,
      };
    });
};

export const getPostData = (id) => {
  const updatedJson = JSON.parse(fs.readFileSync(UPDATED_FILE, "utf8"));
  const linksJson = JSON.parse(fs.readFileSync(LINKS_FILE, "utf8"));
  const updatedData = updatedJson.find((data) => data.id === id);
  const linkData = linksJson.find((post) => post.id === id);
  const fullPath = path.join(POST_DIR, `${id}.md`);
  const content = fs.existsSync(fullPath)
    ? fs.readFileSync(fullPath, "utf8")
    : "";
  const lastUpdate = updatedData?.updated ?? null;
  const refLinks = linkData?.refLinks ?? [];
  const links = linkData?.links ?? [];
  return {
    id,
    content,
    lastUpdate,
    refLinks,
    links,
  };
};
