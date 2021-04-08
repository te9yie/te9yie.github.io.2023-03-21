import Link from "next/link";
import CodeBlock from "../components/CodeBlock";
import remarkWikiLink from "remark-wiki-link";
import P5Sketch from "../components/P5Sketch";

export const components = {
  a: (props) => <Link {...props} />,
  code: CodeBlock,
  P5Sketch: P5Sketch,
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
