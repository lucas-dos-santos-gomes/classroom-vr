const camera = document.querySelector('#camera');

// ponteiro do mouse no centro da tela
document.addEventListener('click', () => {
  document.body.requestPointerLock();
});

// Atualizar a rotação da câmera com o movimento do mouse
document.addEventListener('mousemove', e => {
  if(document.pointerLockElement === document.body) {
    const sensitivity = 0.001;
    camera.components['look-controls'].yawObject.rotation.y -= e.movementX * sensitivity;
    camera.components['look-controls'].pitchObject.rotation.x -= e.movementY * sensitivity;
  }
});