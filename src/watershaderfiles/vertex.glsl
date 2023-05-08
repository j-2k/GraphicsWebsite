export default
`
varying vec2 vUv;
uniform float u_time;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
}
`