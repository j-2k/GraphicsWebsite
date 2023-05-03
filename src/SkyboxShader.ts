import * as THREE from 'three';

const starFunction= `
float Star(vec2 uv, float flare,float starDown)
{
    float d = length(uv);
    float m = .01/d;
    
    //float star = max(1. - abs(uv.x * uv.y) * 1000. - 0.2,0.);
    //m += star * flare;
    m -= starDown;
    return m;
}
`;

// Create a custom shader material that generates the skybox
const skyboxMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    varying vec3 vPosition;
    varying vec2 vUV;

    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vUV = uv;
    }
  `,
  fragmentShader: `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;
    uniform float time;

    varying vec2 vUV;

    varying vec3 vPosition;

    ${starFunction}

    void main() {
      //float h = normalize(vPosition + offset).y;
      //gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
      
      vec2 uv = (vUV * 2. - 1.);
      vec2 uvm = uv;
      uv *= 50.;
      vec3 col = vec3(0);


      float d = length(uv);

      uv.xy += time;

      vec2 gv = fract(uv) - 0.5;
      col += Star(gv,1.0,0.);
      //col.rg += gv;

      float mask = smoothstep(0.6,0.5,abs(uvm.y)) * 1.;

      gl_FragColor = vec4(col * mask,1);
     //gl_FragColor = vec4(mask,mask,mask,1);
    }
  `,
  uniforms: {
    time: { value: 0 },
    topColor: { value: new THREE.Color(0x0077ff) },
    bottomColor: { value: new THREE.Color(0xffffff) },
    offset: { value: 200 },
    exponent: { value:  0.5},
  },
  side: THREE.BackSide,
  fog: true
});

function CustomSkyboxMesh()
{
    const skyboxGeometry = new THREE.SphereGeometry(900, 64, 64);
    const skyboxMesh = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    return skyboxMesh;
}

export {
    CustomSkyboxMesh,
    skyboxMaterial
}