import Image from "next/image";
import Link from "next/link";
import Title from "../components/Title";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getSortedAllPostIds } from "../libs/posts";

const IndexPage = ({ ids }) => {
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
        <Image src="/grass.png" alt="grass" width={540} height={70} />
      </div>
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
