let isWKeyPressed:boolean = false;
let isAKeyPressed:boolean = false;
let isSKeyPressed:boolean = false;
let isDKeyPressed:boolean = false;
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
  });

  window.addEventListener("mousedown", () => (mousePressed = true))
  window.addEventListener("mouseup", () => (mousePressed = false))

export {
    isWKeyPressed,
    isAKeyPressed,
    isSKeyPressed,
    isDKeyPressed,
    mousePressed
}