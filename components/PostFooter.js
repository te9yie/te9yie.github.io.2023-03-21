import Link from "next/link";

const CreateAt = ({ date }) => {
  return date ? <div>create at: {date}</div> : null;
};
const UpdateAt = ({ date }) => {
  return date ? <div>update at: {date}</div> : null;
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
    <div className="date">
      <CreateAt date={postData.create_at} />
      <UpdateAt date={postData.update_at} />
    </div>
    <div className="link">
      <Links name="ref links" links={postData.refLinks} />
      <Links name="links" links={postData.links} />
    </div>
  </div>
);

export default PostFooter;
