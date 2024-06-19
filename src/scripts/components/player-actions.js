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

    element.addEventListener('collide', function(e) {
      console.log(e);
      console.log('Player has collided with body #' + e.detail.body.id);

      console.log(e.detail.target.el);  // Original entity (playerEl).
      console.log(e.detail.body.el);    // Other entity, which playerEl touched.
      console.log(e.detail.contact);    // Stats about the collision (CANNON.ContactEquation).
      console.log(e.detail.contact.ni); // Normal (direction) of the collision (CANNON.Vec3).
    });


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
          if(count >= 3) direction = 'down';
          element.setAttribute('position', {
            x: element.getAttribute('position').x,
            y: direction === 'up' ? (count <= 3 ? count : 3) : (count >= 1.6 ? count : 1.6),
            z: element.getAttribute('position').z,
          });
          (count <= 1.6 && direction === 'down') && clearInterval(intervalId);
        }, 15);
      }
    });
  }
});