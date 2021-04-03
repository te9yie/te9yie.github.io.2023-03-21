import Link from "next/link";
import Title from "../components/Title";
import Footer from "../components/Footer";
import { getSortedAllPostIds } from "../libs/posts";

const IndexPage = ({ ids }) => {
  const List = () => {
    return ids.length === 0 ? null : (
      <ul>
        {ids.map(({ id, updated }) => (
          <li key={id}>
            {updated}{" "}
            <Link href={id}>
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
      <List />
      <Footer />
    </>
  );
};

export const getStaticProps = () => {
  const ids = getSortedAllPostIds();
  return {
    props: {
      ids,
    },
  };
};

export default IndexPage;
