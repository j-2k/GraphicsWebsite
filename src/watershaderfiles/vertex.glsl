export default`

varying vec2 vUv;
uniform float u_time;
uniform float w_heightX;
uniform float w_heightY;

void main() {
    vec4 pos;
    
    pos = vec4(position.x,
    position.y,
    position.z,
     1.0);

    //pos.z += sin((uv.x + u_time * 0.05) * 90.) * w_heightX;
    //pos.z += sin((uv.y + u_time * 0.05) * 70.+20.) * w_heightY;
    gl_Position = projectionMatrix * modelViewMatrix * pos;
    vUv = uv;
}
`