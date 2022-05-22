import { useState, useEffect } from "react";
import loadable from "@loadable/component";

const P5Sketch = ({ name }) => {
  const Sketch = loadable(() => import("react-p5"));
  const [sketch, setSketch] = useState(null);
  useEffect(() => {
    const f = async () => {
      const { default: m } = await import(`../libs/p5/${name}`);
      setSketch(m);
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {sketch ? <Sketch setup={sketch.setup} draw={sketch.draw} /> : null}
    </div>
  );
};

export default P5Sketch;
