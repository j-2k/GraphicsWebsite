import * as THREE from 'three';

// Create a custom shader material that generates the skybox
const skyboxMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    varying vec3 vPosition;

    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;

    varying vec3 vPosition;

    void main() {
      float h = normalize(vPosition + offset).y;
      gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
    }
  `,
  uniforms: {
    topColor: { value: new THREE.Color(0x0077ff) },
    bottomColor: { value: new THREE.Color(0xffffff) },
    offset: { value: 200 },
    exponent: { value:  0.5},
  },
  side: THREE.BackSide,
  fog: true
});

function CustomSkyboxMesh()
{
    const skyboxGeometry = new THREE.SphereGeometry(900, 64, 64);
    const skyboxMesh = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    return skyboxMesh;
}

export {
    CustomSkyboxMesh
}