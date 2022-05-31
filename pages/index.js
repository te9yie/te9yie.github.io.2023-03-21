/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Title from "../components/Title";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {
  getPostData,
  getSortedCreatePostIds,
  getSortedUpdatePostIds,
} from "../libs/posts";
import { components, remarkPlugins } from "../libs/mdx";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

const DAILY_N = 1;
const LIST_N = 10;

const IndexPage = ({ daily, ids }) => {
  const Daily = () => {
    return daily.length === 0 ? null : (
      <div className="daily">
        {daily.map((postData) => (
          <article key={postData.id}>
            <h2>
              <Link href={`/${postData.id}`}>{postData.id}</Link>
            </h2>
            <MDXRemote {...postData.content} components={components} />
          </article>
        ))}
      </div>
    );
  };
  const List = () => {
    return ids.length === 0 ? null : (
      <ul>
        {ids.map(({ id, update_at }) => (
          <li key={id}>
            {update_at}{" "}
            <Link href={`/${id}`}>
              <a>{id}</a>
            </Link>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <>
      <Title />
      <Nav isIndex={true} />
      <div className="grass">
        <img src="/grass.png" alt="grass" width={540} height={70} />
      </div>
      <Daily />
      <List />
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const daily = await Promise.all(
    getSortedCreatePostIds()
      .slice(0, DAILY_N)
      .map(async (data) => {
        const postData = getPostData(data.id);
        postData.content = await serialize(postData.content, {
          components,
          mdxOptions: {
            remarkPlugins,
          },
        });
        return postData;
      })
  );
  const ids = getSortedUpdatePostIds().slice(0, LIST_N);
  return {
    props: {
      daily,
      ids,
    },
  };
};

export default IndexPage;
