import { bool, float } from "three/examples/jsm/nodes/Nodes.js";

let isWKeyPressed:boolean = false;
let isAKeyPressed:boolean = false;
let isSKeyPressed:boolean = false;
let isDKeyPressed:boolean = false;
let isCTRLLKeyPressed:boolean = false;
let isSpaceKeyPressed:boolean = false;
let mousePressed:boolean = false;

  document.addEventListener('keydown', (event) => {
    // Check if the key is the one you want to detect
    if (event.code === 'KeyW') {
      isWKeyPressed = true;
    }
    if (event.code === 'KeyA') {
        isAKeyPressed = true;
    }
    if (event.code === 'KeyS') {
        isSKeyPressed = true;
    }
    if (event.code === 'KeyD') {
        isDKeyPressed = true;
    }
    if (event.code === 'ControlLeft') {
      isCTRLLKeyPressed = true;
    }
    if (event.code === 'Space') {
      isSpaceKeyPressed = true;
    }
  });
  
  document.addEventListener('keyup', (event) => {
    // Check if the key is the one you want to detect
    if (event.code === 'KeyW') {
      isWKeyPressed = false;
    }
    if (event.code === 'KeyA') {
        isAKeyPressed = false;
    }
    if (event.code === 'KeyS') {
        isSKeyPressed = false;
    }
    if (event.code === 'KeyD') {
        isDKeyPressed = false;
    }
    if (event.code === 'ControlLeft') {
      isCTRLLKeyPressed = false;
    }
    if (event.code === 'Space') {
      isSpaceKeyPressed = false;
    }
  });

  const customMouseEvents = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  }

  function onMouseMove(event: MouseEvent) {
    customMouseEvents.x = event.clientX;
    customMouseEvents.y = event.clientY;
    
    // Use the x and y coordinates in Three.js
  }

  document.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mousedown", () => (
    mousePressed = true,
    customMouseEvents.startX = customMouseEvents.x,
    customMouseEvents.startY = customMouseEvents.y
    ))
  window.addEventListener("mouseup", () => (
    mousePressed = false,
    customMouseEvents.endX = customMouseEvents.x,
    customMouseEvents.endY = customMouseEvents.y,
    ))

  

export {
    isWKeyPressed,
    isAKeyPressed,
    isSKeyPressed,
    isDKeyPressed,
    mousePressed,
    customMouseEvents,
    isCTRLLKeyPressed,
    isSpaceKeyPressed
}