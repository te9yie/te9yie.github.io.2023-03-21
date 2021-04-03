import { AUTHOR } from "../libs/const";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer>
      &copy; {year} {AUTHOR}
    </footer>
  );
};

export default Footer;
