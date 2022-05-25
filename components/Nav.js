import Link from "next/link";
import { SITE_NAME } from "../libs/const";

const Nav = ({ isIndex }) => {
  const SiteName = () => {
    return isIndex ? null : (
      <li>
        <Link href="/">
          <a id="site-name">{SITE_NAME}</a>
        </Link>
      </li>
    );
  };
  return (
    <nav>
      <ul>
        <SiteName />
        <li>
          <Link href="https://github.com/te9yie/te9yie.github.io">
            <a>
              <i className="fab fa-github"></i>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/archive">
            <a>一覧</a>
          </Link>
        </li>
        <li>
          <Link href="https://www.google.com/search?q=site:te9yie.github.io">
            <a>検索</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
