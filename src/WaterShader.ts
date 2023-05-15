import * as THREE from 'three';
import { uniformData } from './main';
import fragmentShader from './watershaderfiles/fragment.glsl';
import vertexShader from './watershaderfiles/vertex.glsl';

const pnoiseTex = new THREE.TextureLoader().load("../images/voronoi_i.png");
pnoiseTex.wrapS = THREE.RepeatWrapping;
pnoiseTex.wrapT = THREE.RepeatWrapping;
const distortionTex = new THREE.TextureLoader().load("../images/WaterDistortion.png");
distortionTex.wrapS = THREE.RepeatWrapping;
distortionTex.wrapT = THREE.RepeatWrapping;

const WaterShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        u_time : { value: 0},
        texture1: { value: pnoiseTex },
        distTexture1: {value: distortionTex},
        w_heightX: { value: 1.2},
        w_heightY: { value: 1.55},
        distortionStrength: {value: .1},
        d_col: { value: new THREE.Color(0x180099) },
        s_col: { value: new THREE.Color(0x0033ee) },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    wireframe: false,
    blending: THREE.AdditiveBlending,/*
    blendSrc: THREE.OneMinusSrcAlphaFactor,
    blendDst: THREE.SrcAlphaFactor,
    blendSrcAlpha: THREE.OneMinusSrcAlphaFactor,
    blendDstAlpha: THREE.SrcAlphaFactor,*/
    side: THREE.FrontSide,
    transparent: true,
    fog: true
});

function CustomWaterPlane()
{
  const waterPlaneGeo = new THREE.PlaneGeometry(100,100,20,20);
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