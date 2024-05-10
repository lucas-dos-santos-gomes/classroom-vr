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

// =======================================

AFRAME.registerComponent('meu-controle', {
  init: () => {
    let el = this.el;
    let velocidade = 0.5; // você pode ajustar a velocidade conforme necessário

    window.addEventListener('keydown', e => {
      let pos = el.getAttribute('position');
      console.log(el);

      switch (e.key) {
        case 'i': // mover para frente
          pos.z -= velocidade;
          break;
        case 'k': // mover para trás
          pos.z += velocidade;
          break;
        case 'j': // mover para a esquerda
          pos.x -= velocidade;
          break;
        case 'l': // mover para a direita
          pos.x += velocidade;
          break;
        default:
          break;
      }

      el.setAttribute('position', pos);
    });
  }
});
