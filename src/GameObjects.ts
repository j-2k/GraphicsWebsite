import * as THREE from 'three';
const GameObjects: THREE.Mesh[] = [];
const DebugGameObjects: THREE.LineSegments[] = [];

// Create a sphere
const geometry = new THREE.SphereGeometry(1,16,16);
const cubeGeometry = new THREE.BoxGeometry(50,9,200);
const material = new THREE.MeshPhongMaterial({ color: "#ff00ff", shininess: 200, specular: 0x444444});
const sphereMesh = new THREE.Mesh(geometry, material);
const material2 = new THREE.MeshPhongMaterial({ color: "#00ff55"});

const sphereMeshL = new THREE.Mesh(geometry, material2);
const sphereMeshR = new THREE.Mesh(geometry, material);
const cubeMesh = new THREE.Mesh(cubeGeometry, material2);
sphereMeshL.position.y = -5;
sphereMeshL.position.z = -1;
sphereMeshR.position.x = -10;
sphereMesh.position.y = 5;
cubeMesh.position.y = -20;
GameObjects.push(sphereMesh);
GameObjects.push(sphereMeshL);
GameObjects.push(sphereMeshR);
GameObjects.push(cubeMesh);
const cg2 = new THREE.BoxGeometry(30,30,30);
const c_dtestm = new THREE.Mesh(cg2, material2);
c_dtestm.position.y  = -20;
c_dtestm.position.z  = -20;
c_dtestm.position.x  = -20;
GameObjects.push(c_dtestm);

//Wireframes
const wireframe = new THREE.WireframeGeometry( geometry );
const line = new THREE.LineSegments( wireframe );
line.material.depthTest = true;
line.material.opacity = 0.25;
line.material.opacity = true;

DebugGameObjects.push(line);

const Mats = {
    material,
    line,
    sphereMesh
}

//i thought this would be a good idea to just export 1 thing & reference from it,
//but now I think its just better to export individual stuff... not sure yet,
//new to typescript & its "good practises", i guess it would depend on the # of things im exporting...
/*
const AllGameObjects = {
    GameObjects,
    DebugGameObjects,
    test,
    Mats
}


//realized you can do this in importing by default by doing the following thanks gpt.
import * as myModule from "./myModule";

const person = new myModule.Person("Alice", 25);
myModule.sayHello(person.name);
console.log(`PI is approximately ${myModule.PI}.`);
*/


/*
export {
    AllGameObjects
}
*/

export {
    GameObjects,
    DebugGameObjects,
    Mats
}