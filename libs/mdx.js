import Link from "next/link";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import wikiLinkPlugin from "remark-wiki-link";

export const components = {
  a: (props) => <Link {...props} />,
};

export const remarkPlugins = [
  remarkBreaks,
  remarkGfm,
  [
    wikiLinkPlugin,
    {
      pageResolver: (name) => [name],
      hrefTemplate: (link) => link,
    },
  ],
];
