import * as THREE from 'three';
import { uniformData } from './main';
import fragmentShader from './watershaderfiles/fragment.glsl';
import vertexShader from './watershaderfiles/vertex.glsl';

const pnoiseTex = new THREE.TextureLoader().load("../images/pnoise.png");
pnoiseTex.wrapS = THREE.RepeatWrapping;
pnoiseTex.wrapT = THREE.RepeatWrapping;

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