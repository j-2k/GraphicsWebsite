import * as THREE from 'three';

const vertexShader = `
//ALL INSIDE THE VERTEX SHADER
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
//ALL INSIDE THE FRAGMENT SHADER
void main() {
  gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
`;

const WaterShaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
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
    CustomWaterPlane
}