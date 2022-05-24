const WIDTH = 16 * 20;
const HEIGHT = 9 * 20;

const setup = (p, parent) => {
  p.createCanvas(WIDTH, HEIGHT).parent(parent);
  p.rectMode(p.CENTER);
  p.noStroke();
};

const draw = (p) => {
  const r = p.mouseY - HEIGHT / 2;
  p.background(222);
  p.fill("#e60033");
  p.rect(WIDTH - p.mouseX, HEIGHT / 2, 80 - r, 80 - r);
  p.rect(p.mouseX, HEIGHT / 2, 80 + r, 80 + r);
};

export default {
  setup,
  draw,
};
