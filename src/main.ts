import * as THREE from 'three';
import "./style.css"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { isWKeyPressed, isAKeyPressed, isSKeyPressed, isDKeyPressed, mousePressed } from './keycodes.ts';
import { gsap } from "gsap";

// Create a scene
const scene = new THREE.Scene();
const sizes = {
  height: window.innerHeight,
  width: window.innerWidth
}

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  sizes.width/sizes.height, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);

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
const material = new THREE.MeshPhongMaterial({ color: "#ff00ff" });
const sphereMesh = new THREE.Mesh(geometry, material);
scene.add(sphereMesh);

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

//Controls
//const controls = new OrbitControls(camera, renderer.domElement);

// Render the scene & Update Loop
function animate() {
  requestAnimationFrame(animate);
  CustomControlKeys();

  
  
  

  // Rotate the sphere with the wireframe
  sphereMesh.rotation.x += 0.01;
  sphereMesh.rotation.y += 0.05;
  sphereMesh.rotation.z += 0.02;
  line.rotation.x += 0.01;
  line.rotation.y += 0.05;
  line.rotation.z += 0.02;
  renderer.render(scene, camera);
}
animate();

function CustomControlKeys()
{
  if(isWKeyPressed)
  {
    camera.position.z -= 0.1;
  }
  if(isAKeyPressed)
  {
    camera.position.x -= 0.1;
  }
  if(isSKeyPressed)
  {
    camera.position.z += 0.1;
  }
  if(isDKeyPressed)
  {
    camera.position.x += 0.1;
  }

  if(mousePressed)
  {
    camera.rotation.y += 0.1;
  }
  
  
}

//renderer.render(scene,camera);