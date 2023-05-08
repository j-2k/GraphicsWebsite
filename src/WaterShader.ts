import * as THREE from 'three';
import { uniformData } from './main';

const vertexShader = `
//ALL INSIDE THE VERTEX SHADER
varying vec2 vUV;
uniform float u_time;
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUV = uv;
}
`;

const fragmentShader = `
//ALL INSIDE THE FRAGMENT SHADER

varying vec2 vUV;
uniform float u_time;
void main() {
  gl_FragColor = vec4(vUV, abs(sin(u_time)), 1);
}
`;

const WaterShaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    wireframe: false,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    transparent: false,
    uniforms: {
        u_time : { value: 0}
    }
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