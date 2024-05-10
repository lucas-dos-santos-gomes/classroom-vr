const camera = document.querySelector('#camera');

// ponteiro do mouse no centro da tela
document.addEventListener('click', () => {
  document.body.requestPointerLock();
});

// Atualizar a rotação da câmera com o movimento do mouse
document.addEventListener('mousemove', (event) => {
  if (document.pointerLockElement === document.body) {
    const sensitivity = 0.001;
    camera.components['look-controls'].yawObject.rotation.y -= event.movementX * sensitivity;
    camera.components['look-controls'].pitchObject.rotation.x -= event.movementY * sensitivity;
  }
});