import Link from "next/link";

const RefLinks = ({ postData }) => {
  return postData.refLinks.length > 0 ? (
    <div className="ref-links">
      ref links:{" "}
      <ul>
        {postData.refLinks.map((link) => (
          <li key={link}>
            <Link href={`/${link}`}>
              <a>{link}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

const Links = ({ postData }) => {
  return postData.links.length > 0 ? (
    <div className="links">
      links:{" "}
      <ul>
        {postData.links.map((link) => (
          <li key={link}>
            <Link href={`/${link}`}>
              <a>{link}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

const PostFooter = ({ postData }) => (
  <div className="post-footer">
    <RefLinks postData={postData} />
    <Links postData={postData} />
  </div>
);

export default PostFooter;
