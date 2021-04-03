import Nav from "./Nav";
import Title from "./Title";
import Footer from "./Footer";

const Body = ({ children, title }) => (
  <>
    <Nav />
    <Title title={title} />
    {children}
    <Footer />
  </>
);

export default Body;
