import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Nav from "../components/Nav";
import Title from "../components/Title";
import PostFooter from "../components/PostFooter";
import Footer from "../components/Footer";
import { components, remarkPlugins } from "../libs/mdx";
import { getAllPostIds, getPostData } from "../libs/posts";

const PostPage = ({ postData }) => (
  <>
    <Nav />
    <Title title={postData.id} />
    <article>
      <MDXRemote {...postData.content} components={components} />
    </article>
    <PostFooter postData={postData} />
    <Footer />
  </>
);

export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postData = getPostData(params.id);
  postData.content = await serialize(postData.content, {
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
