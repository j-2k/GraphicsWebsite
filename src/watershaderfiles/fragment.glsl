export default`

uniform sampler2D texture1;
varying vec2 vUv;
uniform float u_time;

void main() {
    vec2 uv = vUv;
    uv *= 2.0;
    uv += (u_time*0.1);
    
    vec4 noise = texture2D(texture1, uv);
    vec4 color = vec4(1. - noise.xyz,1.);

    if (color.r > 0.1)
    {
        //discard;
    }

    gl_FragColor = color;
    //gl_FragColor = vec4(vUv, abs(sin(u_time)), 1);
}
`