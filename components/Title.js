import Head from "next/head";
import { SITE_NAME } from "../libs/const";

const Title = ({ title }) => {
  const isIndex = title === undefined;
  const titleInHead = isIndex ? SITE_NAME : `${title} | ${SITE_NAME}`;
  const titleInH1 = isIndex ? SITE_NAME : title;
  return (
    <>
      <Head>
        <title>{titleInHead}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <h1>{titleInH1}</h1>
      </header>
    </>
  );
};

export default Title;
