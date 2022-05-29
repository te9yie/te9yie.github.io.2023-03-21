import Link from "next/link";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import wikiLinkPlugin from "remark-wiki-link";
import P5Sketch from "../components/P5Sketch";
import YouTube from "../components/YouTube";

export const components = {
  a: (props) => <Link {...props} />,
  P5Sketch,
  YouTube,
};

export const remarkPlugins = [
  remarkBreaks,
  remarkGfm,
  [
    wikiLinkPlugin,
    {
      pageResolver: (name) => [name],
      hrefTemplate: (link) => `/${link}`,
    },
  ],
];
