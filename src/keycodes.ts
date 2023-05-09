import * as THREE from 'three';

let isWKeyPressed:boolean = false;
let isAKeyPressed:boolean = false;
let isSKeyPressed:boolean = false;
let isDKeyPressed:boolean = false;
let isCTRLLKeyPressed:boolean = false;
let isSpaceKeyPressed:boolean = false;
let mousePressed:boolean = false;
let isShiftLKeyPressed:boolean = false;

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
    if (event.code === 'ShiftLeft') {
      isShiftLKeyPressed = true;
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
    if (event.code === 'ShiftLeft') {
      isShiftLKeyPressed = false;
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
    customMouseEvents.endY = customMouseEvents.y
    ))

    let lastRot = {
      x: 0,
      y: 0
    };
    let currentRot = {
      x: 0,
      y: 0
    };
    let speed:number = 10;
    const worldCamOrigin = new THREE.Vector3(0,0,5);
    const titleText = document.querySelector(".title") as HTMLElement;
    let refCamera:THREE.Camera;

    function CustomControlKeys(camera:THREE.Camera,deltaTime:number)
    {
      if(refCamera == null)
      {
        refCamera = camera;
      }
      if(mousePressed)
      {
        if(isShiftLKeyPressed)
        {
          if(speed<= 200)
          {
            if(speed <= 50)
            {
              speed = 50;
            }
            speed += 100 * deltaTime;    
          }
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
      lastRot.x = refCamera.rotation.y,
      lastRot.y = refCamera.rotation.x
      ));





export {
    CustomControlKeys
}