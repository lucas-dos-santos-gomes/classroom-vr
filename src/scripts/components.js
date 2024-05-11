// Função de agachar (serve para agachar e levantar)
function crouch(key, element, direction) {
  if(key === 'Shift') {
    const position = element.getAttribute('position');
    const axisY = position.y;
    let count = axisY;

    let intervalId = setInterval(() => {
      count = (direction === 'down' ? (count - 0.1) : (count + 0.1));
      element.setAttribute('position', {
        x: element.getAttribute('position').x,
        y: direction ==='down' ? (count >= 3 ? count : 3) : (count <= 6 ? count : 6),
        z: element.getAttribute('position').z,
      });
      direction === 'down' ? (count <= 3 && clearInterval(intervalId)) : (count >= 6 && clearInterval(intervalId));
    }, 5);
  }
}

// Componente/atributo colocado na câmera para ter as funções de movimento
AFRAME.registerComponent('moviment', {
  schema: {
    
  },

  init: function() {
    const element = this.el;
    // Agachar / Levantar
    window.addEventListener('keydown', e => crouch(e.key, element, 'down'));
    window.addEventListener('keyup', e => crouch(e.key, element, 'up'));

    // Pular
    window.addEventListener('keypress', e => {
      if(e.code === 'Space') {
        const position = element.getAttribute('position');
        const axisY = position.y;
        let count = axisY;
        let direction = 'up'

        let intervalId = setInterval(() => {
          count = direction === 'up' ? count + 0.1 : count - 0.1;
          if(count >= 10) direction = 'down';
          element.setAttribute('position', {
            x: element.getAttribute('position').x,
            y: direction === 'up' ? (count <= 10 ? count : 10) : (count >= 6 ? count : 6),
            z: element.getAttribute('position').z,
          });
          (count <= 3 && direction === 'down') && clearInterval(intervalId);
        }, 6);
      }
    });
  },

  update: function() {
    // Do something when component's data is updated.
  },

  remove: function() {
    // Do something the component or its entity is detached.
  },

  tick: function(time, timeDelta) {
    // Do something on every scene tick or frame.
  }
});