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
    window.addEventListener('keydown', e => {
      if(e.key == 'Shift') {
        const element = this.el;
        const position = element.getAttribute('position');
        const axisY = position.y;
        let count = axisY;

        let down = setInterval(() => {
          count = count - 0.1;
          element.setAttribute('position', {
            x: element.getAttribute('position').x,
            y: count,
            z: element.getAttribute('position').z,
          });
          console.log(count);
          count <= 3 && clearInterval(down);
        }, 5);
      }
    });

    window.addEventListener('keyup', e => {
      if(e.key == 'Shift') {
        const element = this.el;
        const position = element.getAttribute('position');
        const axisY = position.y;
        let count = axisY;

        let up = setInterval(() => {
          count = count + 0.1;
          element.setAttribute('position', {
            x: element.getAttribute('position').x,
            y: count <= 6 ? count : 6,
            z: element.getAttribute('position').z,
          });
          console.log(count);
          count >= 6 && clearInterval(up);
        }, 5);
      }
    });
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
