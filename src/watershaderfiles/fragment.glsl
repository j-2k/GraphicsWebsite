export default`

uniform sampler2D texture1;
uniform sampler2D distTexture1;
varying vec2 vUv;
uniform float u_time;

void main() {
    vec2 uv = vUv * 2.;
    //uv += (u_time*0.2);
    vec2 duv = vUv * 3.;
    
    vec2 distortSample = (texture2D(distTexture1, duv).xy * 2. - 1.) * 0.2;
    vec3 color = vec3(0.,1.,1.);


    vec2 noiseUV = vec2(
        (uv.x + u_time*0.1) + distortSample.x,
        (uv.y + u_time*0.1) + distortSample.y);
    vec3 noiseWater = 1. - texture2D(texture1, noiseUV).xyz;
    vec3 noise = 1. - texture2D(texture1, noiseUV).xyz;


    float surfaceNoise = noise.x > 0.77 ? 1. : 0.;
    vec3 fc = vec3(noiseWater + surfaceNoise  + color);

    vec4 col = vec4(fc,1.);

    gl_FragColor = col;
}
/*
    if (nc.b < 0.4)
    {
        discard;
    }
*/
`