import Nav from "./Nav";
import Title from "./Title";
import Footer from "./Footer";

const Body = ({ children, title }) => (
  <>
    <Nav />
    <Title title={title} />
    <article>{children}</article>
    <Footer />
  </>
);

export default Body;
