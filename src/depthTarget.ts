import * as THREE from 'three';
const depthRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth,window.innerHeight);
depthRenderTarget.depthTexture = new THREE.DepthTexture(window.innerWidth,window.innerHeight);
depthRenderTarget.depthBuffer = true;

const vertexShader = `
varying vec2 vUv;
void main() {
    vec4 pos;
    pos = vec4(position.x,
    position.y,
    position.z,
     1.0);
    gl_Position = projectionMatrix * modelViewMatrix * pos;
    vUv = uv;
}
`;

const fragmentShader = `
#include <packing>
uniform sampler2D depthTexture;
uniform sampler2D texture1;
varying vec2 vUv;
uniform float camNear;
uniform float camFar;

void main() {
float depth = texture2D(depthTexture, vUv).r;
vec3 albedo = texture2D(texture1, vUv).rgb;
float viewZ = perspectiveDepthToViewZ(depth, camNear,camFar);
float depthFinal = viewZToOrthographicDepth(viewZ,camNear,camFar);
gl_FragColor = vec4(vec3(1. - depthFinal), 1.);
}
`;

const depthMaterial = new THREE.ShaderMaterial({
uniforms: {
depthTexture: { value: depthRenderTarget.depthTexture },
texture1: { value: depthRenderTarget.texture},
camFar: {value: 100.},
camNear: {value: 0.1}
},
vertexShader: vertexShader,
fragmentShader: fragmentShader
});

const pgeo = new THREE.PlaneGeometry(2, 2);
const dmesh = new THREE.Mesh(pgeo, depthMaterial);
//dmesh.position.z = -50;//-14;
//mesh.rotation.x = Math.PI * -0.5;
const postScene = new THREE.Scene();
postScene.add(dmesh);
const postCamera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

export{
    depthRenderTarget,
    postScene,
    postCamera,
    depthMaterial
}