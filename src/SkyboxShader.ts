import * as THREE from 'three';
//im dying over doing this procedurally shouldve just used textures.
const starFunction= `
float Star(vec2 uv, float flare,float starDown)
{
    float d = length(uv);
    float m = .05/d;
    
    //float star = max(1. - abs(uv.x * uv.y) * 1000. - 0.2,0.);
    //m += star * flare;
    m -= starDown;

    return max(m,0.);
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
      vec2 uvc = uv;
      uvc.x *= 50. * 2.;
      uvc.y *= 25. * 2.;
      
      uvc.y += (uvc.y + time*1.);
      uvc.x += (uvc.x + time*-1.);
      
      
      /*
      vec2 uvtl = uv;
      vec2 uvbr = uv;
      uvtl *= 10.;
      uvtl.x -= 10.;
      uvbr*= 15.;
      uvbr.x -= 5.;
      */
     
     
      vec3 col = vec3(0.);

      vec2 gv = fract(uvc) - 0.5;
      col += Star(gv,1.0,0.15);
      //col.rg += gv;

      float mask = smoothstep(0.6,0.5,abs(uvm.y)) * 1.;
      float m2 = sin(length(uvm*uvm * 10. + time*2.));

      
      /*
      vec3 b = vec3(.0,.0,.0);
      vec3 w = vec3(1.0,1.0,1.0);
      uvc *= 10.;
      float c = float(mix(b, w , abs(uvc.x+ sin(fract(time*1.1) * 3. - 1.5) * 90.)));
      float c2 = float(mix(b, w , abs(uvc.y+ sin(fract(time*1.1) * 3. - 1.5) * 90.)));
      float ctl = float(mix(b, w , abs(uvtl.x+ sin(fract(time*1.) * 3. - 1.5) * 10.)));
      float ctl2 = float(mix(b, w , abs(uvtl.y+ sin(fract(time*1.) * 3. - 1.5) * 10.)));
      float cbr =  float(mix(b, w , abs(uvbr.x+ sin(fract(time*1.) * 3. - 1.5) * 25.)));
      float cbr2 = float(mix(b, w , abs(uvbr.y+ sin(fract(time*1.) * 3. - 1.5) * 25.)));
      float fc = 1.-((c+c2)-10.);
      float fc2 = 1.-((ctl+ctl2)- 1.);
      float fc3 = 1.-((cbr+cbr2)-1.);
      
      float fCols = max((fc * fc2 * fc3),0.);
      col *= mask;
      col *= fCols;
      */
      //gl_FragColor = vec4(vec3(col),1.);
      gl_FragColor = vec4(vec3(col) * (m2 * mask),1.);
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