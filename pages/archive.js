import Link from "next/link";
import Nav from "../components/Nav";
import Title from "../components/Title";
import Footer from "../components/Footer";
import { getSortedUpdatePostIds } from "../libs/posts";

const ArchivePage = ({ ids }) => {
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
      <Nav />
      <Title title="Archive" />
      <List />
      <Footer />
    </>
  );
};

export const getStaticProps = () => {
  const ids = getSortedUpdatePostIds();
  return {
    props: {
      ids,
    },
  };
};

export default ArchivePage;
