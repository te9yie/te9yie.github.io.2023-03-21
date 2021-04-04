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
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
          integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <header>
        <h1>{titleInH1}</h1>
      </header>
    </>
  );
};

export default Title;
