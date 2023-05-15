import * as THREE from 'three';
import "./style.css"
import { CustomControlKeys } from './keycodes.ts';
import { CustomWaterPlane, WaterShaderMaterial } from './WaterShader.ts';
import { CustomSkyboxMesh, skyboxMaterial } from './SkyboxShader.ts';
import 'three/src/math/MathUtils.js';
import * as DepthInfo from './depthTarget.ts';
import {AboutButtonHandler} from './TextHandling.ts';
AboutButtonHandler();
import * as AllGameObjects from './GameObjects.ts';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { gsap } from "gsap";

//Resizing
window.addEventListener('resize', () => {
  sizes.height = window.innerHeight
  sizes.width = window.innerWidth

  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
})
// Create a scene
const scene = new THREE.Scene();
const sizes = {
  height: window.innerHeight,
  width: window.innerWidth
}
const worldOrigin = new THREE.Vector3(0,0,0);

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  sizes.width/sizes.height, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);

DepthInfo.depthMaterial.uniforms.camFar.value = camera.far * 0.01;
DepthInfo.depthMaterial.uniforms.camNear.value = camera.near;

//https://stackoverflow.com/questions/17517937/three-js-camera-tilt-up-or-down-and-keep-horizon-level/17518092#17518092
//https://stackoverflow.com/questions/42569465/3d-camera-x-axis-rotation
camera.rotation.order = 'YXZ'

// Set the camera position
camera.position.z = 5;
// Create a renderer
const canvas = document.querySelector(".webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({canvas});

// Set the renderer size to the window size
renderer.setSize(sizes.width,sizes.height);

// Add the renderer to the document
document.body.appendChild(renderer.domElement);



//Light
const light = new THREE.PointLight(0xffffff,1,100);
light.position.set(10,10,10);
scene.add(light);

scene.add(camera);

const clock = new THREE.Clock();
const uniformData = {
  time:{
    type: 'f',
    value: clock.getElapsedTime(),
  },
};

//ADDING ALL MY SHADERS HERE
scene.add(CustomWaterPlane());
scene.add(CustomSkyboxMesh());

//Adding Game Objects
AllGameObjects.GameObjects.forEach((gameObject)=>{
  scene.add(gameObject);
})
AllGameObjects.DebugGameObjects.forEach((gameObject)=>{
  scene.add(gameObject);
})

//Controls
//const controls = new OrbitControls(camera, renderer.domElement);


let deltaTime:number = 0;
let a:number = 0;
const fpsText = document.getElementById("FPSid")!;
let fps:number = 0;
function FPSHandler()
{
  //fps++;
  fps = 1/deltaTime;
  fpsText.innerText = `FPS: ${fps.toFixed(0)}`;
}

// Render the scene & Update Loop
function Update() {
  deltaTime = clock.getDelta();
  requestAnimationFrame(Update);
  CustomControlKeys(camera,deltaTime);
  TimeVarForShaders();

  if(clock.elapsedTime > 0.5 + a)
  {
    FPSHandler();
    a = clock.elapsedTime;
  }
  
  AllGameObjects.Mats.material.color.setRGB(
    THREE.MathUtils.lerp(0,1,sinTime01(2,0.5,1.5)),
    THREE.MathUtils.lerp(0,1,sinTime01(1.5,0.5,-1.5)),
    THREE.MathUtils.lerp(0,1,sinTime01(1,0.5,0))
    );
    AllGameObjects.Mats.sphereMesh.scale.setScalar(sinTime01(1,0.5,0) * 1);

  // Rotate the sphere with the wireframe
  AllGameObjects.Mats.sphereMesh.rotation.x += 0.01;
  AllGameObjects.Mats.sphereMesh.rotation.y += 0.05;
  AllGameObjects.Mats.sphereMesh.rotation.z += 0.02;
  AllGameObjects.Mats.line.rotation.x += 0.01;
  AllGameObjects.Mats.line.rotation.y += 0.05;
  AllGameObjects.Mats.line.rotation.z += 0.02;
  

  renderer.setRenderTarget( DepthInfo.depthRenderTarget );
  renderer.render( scene, camera );

  renderer.setRenderTarget( null );
  renderer.render( scene, camera );
  //renderer.render( DepthInfo.postScene, DepthInfo.postCamera ); //uncomment this line to see the grayscale

}
Update();

function sinTime01(speed:number, range:number, offset:number):number
{
  const sinTime01Final:number = Math.sin(clock.elapsedTime*speed + offset) * range + range;
  return sinTime01Final;
}

function TimeVarForShaders()
{
  uniformData.time.value = clock.getElapsedTime();
  skyboxMaterial.uniforms.time.value = uniformData.time.value
  WaterShaderMaterial.uniforms.u_time.value = uniformData.time.value
}