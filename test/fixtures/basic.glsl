#pragma glslify: noise = require('glsl-noise/simplex/2d')

void main() {
  float d = noise(gl_FragCoord.xy * 0.01);

  gl_FragColor = vec4(d, d, d, 1.0);
}
