import * as THREE from 'three';
import "./style.css"
import { isWKeyPressed, isAKeyPressed, isSKeyPressed, isDKeyPressed, mousePressed, customMouseEvents, isCTRLLKeyPressed, isSpaceKeyPressed, isShiftLKeyPressed } from './keycodes.ts';
import { CustomWaterPlane } from './WaterShader.ts';
import { CustomSkyboxMesh } from './SkyboxShader.ts';

//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { gsap } from "gsap";

// Create a scene
const scene = new THREE.Scene();
const sizes = {
  height: window.innerHeight,
  width: window.innerWidth
}
const worldOrigin = new THREE.Vector3(0,0,0);
const worldCamOrigin = new THREE.Vector3(0,0,5);
// Create a camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  sizes.width/sizes.height, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);

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

// Create a sphere
const geometry = new THREE.SphereGeometry(1,16,16);
const cubeGeometry = new THREE.BoxGeometry(150,1,150);
const material = new THREE.MeshPhongMaterial({ color: "#ff00ff" });
const sphereMesh = new THREE.Mesh(geometry, material);

const sphereMeshL = new THREE.Mesh(geometry, new THREE.MeshToonMaterial());
const sphereMeshR = new THREE.Mesh(geometry, material);
const cubeMesh = new THREE.Mesh(cubeGeometry, material);
sphereMeshL.position.x = 10;
sphereMeshR.position.x = -10;
cubeMesh.position.y = -20;
//scene.add(sphereMesh);
//scene.add(sphereMeshL,sphereMeshR,cubeMesh);


//Light
const light = new THREE.PointLight(0xffffff,1,100);
light.position.set(10,10,10);
scene.add(light);


//Wireframes
const wireframe = new THREE.WireframeGeometry( geometry );
const line = new THREE.LineSegments( wireframe );
line.material.depthTest = true;
line.material.opacity = 0.25;
line.material.opacity = true;

scene.add(line);
scene.add(camera);

//Resizing
window.addEventListener('resize', () => {
  sizes.height = window.innerHeight
  sizes.width = window.innerWidth

  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
})
/*
const loop = () => {
  sphereMesh.position.x += 0.01;
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()
*/

//ADDING ALL MY SHADERS HERE
scene.add(CustomWaterPlane());
scene.add(CustomSkyboxMesh());

//Controls
//const controls = new OrbitControls(camera, renderer.domElement);
let lastRot = {
  x: 0,
  y: 0
};
let currentRot = {
  x: 0,
  y: 0
};
let speed:number = 10;
const clock = new THREE.Clock();
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

const titleText = document.querySelector(".title") as HTMLElement;

// Render the scene & Update Loop
function Update() {
  deltaTime = clock.getDelta();
  requestAnimationFrame(Update);
  CustomControlKeys();
    
  

  if(clock.elapsedTime > 0.5 + a)
  {
    FPSHandler();
    material.color.setRGB(
      THREE.MathUtils.randFloat(0,1),
      1,
      THREE.MathUtils.randFloat(0,1)
      );
    a = clock.elapsedTime;
  }
  


  // Rotate the sphere with the wireframe
  sphereMesh.rotation.x += 0.01;
  sphereMesh.rotation.y += 0.05;
  sphereMesh.rotation.z += 0.02;
  line.rotation.x += 0.01;
  line.rotation.y += 0.05;
  line.rotation.z += 0.02;
  renderer.render(scene, camera);
}
Update();




function CustomControlKeys()
{
  if(mousePressed)
  {
    if(isShiftLKeyPressed)
    {
      speed = 20;
    }
    else
    {
      speed = 10;
    }
    if(isWKeyPressed)
    {
      camera.translateZ(-1 * speed * deltaTime);
    }
    if(isAKeyPressed)
    {
      camera.translateX(-1 * speed * deltaTime);
    }
    if(isSKeyPressed)
    {
      camera.translateZ(+1 * speed * deltaTime);
    }
    if(isDKeyPressed)
    {
      camera.translateX(+1 * speed * deltaTime);
    }
    if(isCTRLLKeyPressed)
    {
      camera.translateY(-1 * (speed * 0.5 * deltaTime));
    }
    if(isSpaceKeyPressed)
    {
      camera.translateY(+1 * (speed * 0.5 * deltaTime));
    }


    
    if(camera.position.distanceTo(worldCamOrigin) > 3)
    {
      
      titleText.classList.add('fade-out');
      titleText.classList.remove('fade-in');
      
    }
    else
    {
      
      titleText.classList.remove('fade-out');
      titleText.classList.add('fade-in');
      
    }

    

    currentRot.x = -((customMouseEvents.x - customMouseEvents.startX)*0.001) * 2;
    currentRot.y = -((customMouseEvents.y - customMouseEvents.startY)*0.001) * 2;
    camera.rotation.y = (currentRot.x + lastRot.x);
    camera.rotation.x = (currentRot.y + lastRot.y);
    camera.rotation.x = THREE.MathUtils.clamp(camera.rotation.x,-(Math.PI * 0.5),Math.PI * 0.5);

    //console.log(Math.round(THREE.MathUtils.RAD2DEG * camera.rotation.x));
  }
}

  window.addEventListener("mouseup", () => (
  lastRot.x = camera.rotation.y,
  lastRot.y = camera.rotation.x
  ));




//renderer.render(scene,camera);
export {
  scene
}