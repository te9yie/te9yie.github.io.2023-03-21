import Link from "next/link";
import remarkGfm from "remark-gfm";
import wikiLinkPlugin from "remark-wiki-link";

export const components = {
  a: (props) => <Link {...props} />,
};

export const remarkPlugins = [
  remarkGfm,
  [
    wikiLinkPlugin,
    {
      pageResolver: (name) => [name],
      hrefTemplate: (link) => link,
    },
  ],
];
