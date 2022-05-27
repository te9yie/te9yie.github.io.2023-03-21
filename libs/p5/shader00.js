const WIDTH = 16 * 20;
const HEIGHT = 9 * 20;

const VERT = `
precision highp float;
attribute vec3 aPosition;

void main() {
  gl_Position = vec4(aPosition, 1.0);
}`;
const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;

const float PI = 3.14159265;
const float angle = 60.0;
const float fov = angle * 0.5 * PI / 180.0;
const vec3 light_dir = normalize(vec3(-1, 1, 1));

vec3 trans(vec3 p) {
  return mod(p, 3.0) - 1.5;
}

float sphere(vec3 p, float r) {
  return length(trans(p)) - r;
}

float calc(vec3 p) {
  return sphere(p, 1.0);
}

vec3 calc_normal(vec3 p) {
  float d = 0.0001;
  return normalize(vec3(
    calc(p + vec3(d, 0, 0)) - calc(p - vec3(d, 0, 0)),
    calc(p + vec3(0, d, 0)) - calc(p - vec3(0, d, 0)),
    calc(p + vec3(0, 0, d)) - calc(p - vec3(0, 0, d))));
}

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
  vec3 eye = vec3(sin(uTime * 0.5), cos(uTime * 0.3) * 0.7, 3);
  vec3 ray = normalize(vec3(sin(fov) * p.x, sin(fov) * p.y, -cos(fov)));

  float distance = 0.0;
  float len = 0.0;
  vec3 pos = eye;
  for (int i = 0; i < 64; ++i) {
    distance = calc(pos);
    len += distance;
    pos = eye + ray * len;
  }

  if (abs(distance) < 0.001) {
    vec3 n = calc_normal(pos);
    float diff = clamp(dot(light_dir, n), 0.1, 1.0);
    gl_FragColor = vec4(vec3(diff), 1);
  } else {
    gl_FragColor = vec4(vec3(0), 1);
  }
}`;

let a_shader;

const setup = (p, parent) => {
  p.createCanvas(WIDTH, HEIGHT, p.WEBGL).parent(parent);
  a_shader = p.createShader(VERT, FRAG);
};

const draw = (p) => {
  a_shader.setUniform("uTime", p.frameCount / 30.0);
  a_shader.setUniform("uResolution", [WIDTH, HEIGHT]);

  p.shader(a_shader);
  p.quad(-1, 1, -1, -1, 1, -1, 1, 1);
  p.resetShader();
};

export default {
  setup,
  draw,
};
