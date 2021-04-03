import Link from "next/link";
import remarkWikiLink from "remark-wiki-link";

export const components = {
  a: (props) => <Link {...props} />,
};

export const remarkPlugins = [
  [
    remarkWikiLink,
    {
      pageResolver: (name) => [name],
      hrefTemplate: (link) => link,
    },
  ],
];
