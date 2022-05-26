const WIDTH = 16 * 20;
const HEIGHT = 9 * 20;

const VERT = `
precision mediump float;

attribute vec3 aPosition;

void main() {
    gl_Position = vec4(aPosition, 1.0);
}`;
const FRAG = `
precision mediump float;
uniform float uRate;
uniform vec2 uResolution;

void main() {
    float x = gl_FragCoord.x / uResolution.x * uRate;
    float y = gl_FragCoord.y / uResolution.y * (1.0 - uRate);
    gl_FragColor = vec4(x, y, 0, 1);
}`;

let a_shader;

const setup = (p, parent) => {
  p.createCanvas(WIDTH, HEIGHT, p.WEBGL).parent(parent);
  a_shader = p.createShader(VERT, FRAG);
};

const draw = (p) => {
  a_shader.setUniform("uRate", p.sin(p.frameCount / 100.0));
  a_shader.setUniform("uResolution", [WIDTH, HEIGHT]);

  p.shader(a_shader);
  p.quad(-1, 1, -1, -1, 1, -1, 1, 1);
  p.resetShader();
};

export default {
  setup,
  draw,
};
