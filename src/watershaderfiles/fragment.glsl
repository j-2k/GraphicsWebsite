export default`

uniform sampler2D texture1;
uniform sampler2D distTexture1;
uniform float distortionStrength;
varying vec2 vUv;
uniform float u_time;

uniform vec3 d_col;
uniform vec3 s_col;

float LinearizeDepth(float depth) 
{
    float z = depth * 2.0 - 1.0; // back to NDC 
    return (2.0 * 0.1 * 1000.0) / (1000.0 + 0.1 - z * (1000.0 - 0.1));	
}

void main() {

    vec2 uv = vUv * 2.;
    //uv += (u_time*0.2);
    vec2 duv = vUv * 4.;
    duv += (u_time*0.1);
    vec2 distortSample = (texture2D(distTexture1, duv).xy * 2. - 1.) * distortionStrength;


    vec2 noiseUV = vec2(
        (uv.x + u_time*0.1) + distortSample.x,
        (uv.y + u_time*0.1) + distortSample.y);
    vec3 noiseWater = 1. - texture2D(texture1, noiseUV).xyz;
    vec3 noise = 1. - texture2D(texture1, noiseUV).xyz;
    float surfaceNoise = noise.x > 0.8 ? 1. : 0.;

    //float depth = LinearizeDepth(gl_FragCoord.z) / 1000.; // divide by far for demonstration
    //vec3 waterCol = mix(s_col,d_col,depth);
    //gl_FragColor = vec4(vec3(waterCol), 1.0);
    vec3 fc = vec3((noiseWater * 1.)*.1 + mix(s_col,d_col,.5) +(1. * surfaceNoise));//vec3(noiseWater + surfaceNoise  + color);


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