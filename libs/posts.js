import fs from "fs";
import path from "path";

const POST_DIR = path.join(process.cwd(), "posts");

export const getAllPostIds = () => {
  return fs.readdirSync(POST_DIR).map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getSortedAllPostIds = () => {
  return fs.readdirSync(POST_DIR).map((fileName) => {
    return {
      id: fileName.replace(/\.md$/, ""),
    };
  });
};

export const getPostData = (id) => {
  const fullPath = path.join(POST_DIR, `${id}.md`);
  const content = fs.readFileSync(fullPath, "utf8");
  return {
    id,
    content,
  };
};
