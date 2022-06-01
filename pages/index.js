/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Title from "../components/Title";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getSortedCreatePostIds } from "../libs/posts";

const LIST_N = 10;

const IndexPage = ({ ids }) => {
  const isDev = process.env.NODE_ENV === "development";

  const Grass = () => {
    return isDev ? null : (
      <div className="grass">
        <img src="/grass.png" alt="grass" width={540} height={70} />
      </div>
    );
  };

  const List = () => {
    return ids.length === 0 ? null : (
      <ul>
        {ids.map(({ id, create_at }) => (
          <li key={id}>
            {create_at}{" "}
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
      <Grass />
      <List />
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const ids = getSortedCreatePostIds().slice(0, LIST_N);
  return {
    props: {
      ids,
    },
  };
};

export default IndexPage;
