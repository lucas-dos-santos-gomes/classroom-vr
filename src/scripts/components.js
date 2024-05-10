AFRAME.registerComponent('my-control', {
  init: () => {
    let el = this.el;
    let velocidade = 0.5; // você pode ajustar a velocidade conforme necessário

    window.addEventListener('keydown', e => {
      console.log(el);
      let pos = el.getAttribute('position');

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

AFRAME.registerComponent('squat', {
  schema: {
    
  },

  init: function () {
    // Do something when component first attached.
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  }
});
