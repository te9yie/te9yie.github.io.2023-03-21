import Link from "next/link";
import { SITE_NAME } from "../libs/const";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a id="site-name">{SITE_NAME}</a>
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

export default Nav;
