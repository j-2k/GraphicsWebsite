export default
`
uniform sampler2D texture1;
varying vec2 vUv;
uniform float u_time;

void main() {
    vec2 uv = vUv;
    uv *= 2.0;
    uv += (u_time);
    
    vec4 color = texture2D(texture1, uv);
    

    if (color.r < 0.5)
    {
        discard;
    }

    gl_FragColor = color;
    //gl_FragColor = vec4(vUv, abs(sin(u_time)), 1);
}
`