import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

const P5Sketch = ({ name }) => {
  const [sketch, setSketch] = useState(null);
  useEffect(() => {
    const f = async () => {
      const { default: m } = await import(`../libs/p5/${name}`);
      setSketch(m);
    };
    f();
  }, []);
  return <div className="sketch">{sketch ? <Sketch {...sketch} /> : null}</div>;
};

export default P5Sketch;
