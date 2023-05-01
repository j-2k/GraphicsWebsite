# GraphicsWebsite
Website that is mainly contained with graphics mainly powered by Typescript &amp; ThreeJS. This is mainly just a fun project to fiddle around with TypeScript &amp; Graphics.

# Building & Running The Project
I worked on this in VSC as my editor and it requires the following installed:
- nodejs / npm (https://nodejs.org/en)
- vite (install globally by doing **npm install -g vite**)
- threejs & gsap (**npm i three gsap**)

after having all requirements downloaded to run it on a localhost web do: 
npm run dev (make sure you are in the repo when you do it or just do it in the vsc terminal)

# Boilerplate startup guide for similar project
DOING THIS TILL THE END WILL GIVE YOU AN IMAGE LIKE THIS.  
<img width="500" height="500" alt="Screenshot 2023-05-01 at 1 16 08 PM" src="https://user-images.githubusercontent.com/52252068/235433794-7270e760-57e5-4f8f-ae53-7cbdda5ea241.png">  

get npm first: https://nodejs.org/en  

do "**npm --version**" to see if installed. 

install vite globally: **npm install -g vite**  

then open empty folder & do the following:  
**npm create vite@latest boilerplate-threejsproj**   
(follow the instructions that come on the terminal [I did steps > vanilla > typescript]). 

**cd boilerplate-threejsproj**  
**npm install**  
**npm run dev**  
(by now a web should be running on localhost with port written on ur terminal)
now ctrl+c / stop terminal & continue dling some other stuff

**npm i three gsap**  
**npm i --save-dev @types/three**  (do this if your using typescript)  
**npm run dev**

by now you should have a web running & seeing the vite + js logo on the web.  
open & clear everything in the folders below:
index.html / main.ts / style.css / (delete other useless garbage as well if needed)

put this in index.html
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Three.js Example</title>
  </head>
  <body>
    <canvas class="webgl"></canvas>
    <script type="module" src="src/main.ts"></script>
  </body>
</html>
```
put this in main.ts
```
import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth/window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);

// Set the camera position
camera.position.z = 5;

// Create a renderer
const canvas = document.querySelector(".webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({canvas});

// Set the renderer size to the window size
renderer.setSize(window.innerWidth,window.innerHeight);

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

//scene.add(line);
scene.add(camera);

// Render the scene
/*
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  sphereMesh.rotation.x += 0.01;
  sphereMesh.rotation.y += 0.05;
  sphereMesh.rotation.z += 0.02;
  line.rotation.x += 0.01;
  line.rotation.y += 0.05;
  line.rotation.z += 0.02;
  renderer.render(scene, camera);
}
//animate();
*/

renderer.render(scene,camera);
```
<img width="601" alt="Screenshot 2023-05-01 at 1 16 08 PM" src="https://user-images.githubusercontent.com/52252068/235433794-7270e760-57e5-4f8f-ae53-7cbdda5ea241.png">

you should now get this on the web sorry if this is really long.

