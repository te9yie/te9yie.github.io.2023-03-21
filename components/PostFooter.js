import Link from "next/link";

const LastUpdate = ({ date }) => {
  return date ? <div>last update: {date}</div> : null;
};

const Links = ({ name, links }) => {
  return links.length > 0 ? (
    <div className="links">
      {name}:{" "}
      <ul>
        {links.map((link) => (
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
    <LastUpdate date={postData.lastUpdate} />
    <Links name="ref links" links={postData.refLinks} />
    <Links name="links" links={postData.links} />
  </div>
);

export default PostFooter;
