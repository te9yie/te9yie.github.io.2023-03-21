import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import Body from "../components/Body";
import { components, remarkPlugins } from "../libs/mdx";
import { getAllPostIds, getPostData } from "../libs/posts";

const PostPage = ({ postData }) => {
  const content = hydrate(postData.content, { components });
  return <Body title={postData.id}>{content}</Body>;
};

export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postData = getPostData(params.id);
  postData.content = await renderToString(postData.content, {
    components,
    mdxOptions: {
      remarkPlugins,
    },
  });
  return {
    props: {
      postData,
    },
  };
};

export default PostPage;
