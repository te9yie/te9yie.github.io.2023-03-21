import Link from "next/link";
import CodeBlock from "../components/CodeBlock";
import remarkWikiLink from "remark-wiki-link";

export const components = {
  a: (props) => <Link {...props} />,
  code: CodeBlock,
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
