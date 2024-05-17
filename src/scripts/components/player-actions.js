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
        y: direction ==='down' ? (count >= 0.8 ? count : 0.8) : (count <= 1.6 ? count : 1.6),
        z: element.getAttribute('position').z,
      });
      direction === 'down' ? (count <= 0.8 && clearInterval(intervalId)) : (count >= 1.6 && clearInterval(intervalId));
    }, 18);
  }
}

// Componente/atributo colocado na câmera para ter as funções de movimento
AFRAME.registerComponent('player-actions', {
  init: function() {
    const element = this.el;
    // Agachar / Levantar
    window.addEventListener('keydown', e => crouch(e.key, element, 'down'));
    window.addEventListener('keyup', e => crouch(e.key, element, 'up'));

    // Verificar clique nas letras
    window.onclick = e => {
      const letters = document.querySelectorAll('.letters');
      letters.forEach(letter => {
        if(letter.states[0] === 'cursor-hovered') {
          let [x, y, z] = letter.getAttribute('position');
          if(letter.parentEl.id == 'last-letter') {
            let [x, y, z] = letter.parentEl.getAttribute('position');
            letter.parentEl.setAttribute('animation', `property: position; loop: false; dur: 2000; easing: linear; from: ${x} ${y} ${z}; to: ${x} ${y+20} ${z}`);
            return;
          }
          letter.setAttribute('animation', `property: position; loop: false; dur: 2000; easing: linear; from: ${x} ${y} ${z}; to: ${x} ${y+20} ${z}`)
        };
      });

      const blackboard = document.querySelector('#blackboard');
      if(blackboard.states[0] === 'cursor-hovered') {
        window.location.pathname = '/src/pages/hard-level.html';
      }
    }

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
        }, 8);
      }
    });
  }
});