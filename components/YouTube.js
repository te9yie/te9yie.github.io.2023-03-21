import React from "react";

const YouTube = (props) => (
  <div className="youtube">
    <iframe
      width={560}
      height={315}
      src={`https://www.youtube.com/embed/${props.videoId}`}
      title="YouTube video player"
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

export default YouTube;
