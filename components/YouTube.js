import dynamic from "next/dynamic";

const EmbededYouTube = dynamic(
  () => import("react-youtube").then((m) => m.default),
  {
    ssr: false,
  }
);

const YouTube = (props) => (
  <div className="youtube">
    <EmbededYouTube {...props} />
  </div>
);

export default YouTube;
