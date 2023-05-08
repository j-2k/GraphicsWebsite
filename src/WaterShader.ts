import * as THREE from 'three';
import { uniformData } from './main';



const pnoiseTex = new THREE.TextureLoader().load("../images/pnoise.png");
pnoiseTex.wrapS = THREE.RepeatWrapping;
pnoiseTex.wrapT = THREE.RepeatWrapping;

const vertexShader = `
//ALL INSIDE THE VERTEX SHADER
varying vec2 vUv;
uniform float u_time;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
}
`;

const fragmentShader = `
//ALL INSIDE THE FRAGMENT SHADER

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
`;

const WaterShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        u_time : { value: 0},
        texture1: { value: pnoiseTex }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    wireframe: false,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    transparent: false
});

function CustomWaterPlane()
{
    
  const waterPlaneGeo = new THREE.PlaneGeometry(50,50,10,10);
  //const waterPlaneMat = new THREE.MeshToonMaterial();  
  const waterPlaneMesh = new THREE.Mesh(waterPlaneGeo, WaterShaderMaterial);
  waterPlaneMesh.position.y = -15;
  waterPlaneMesh.rotation.x = Math.PI * -0.5;
  return waterPlaneMesh;
}

export {
    CustomWaterPlane,
    WaterShaderMaterial
}