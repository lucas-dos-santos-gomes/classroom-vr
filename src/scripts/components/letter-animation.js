AFRAME.registerComponent('letter-animation', {
  init: function() {
    const letter = this.el;
    this.direction = 'up';
    setInterval(() => {
      let letterPosition = letter.getAttribute('position');
      let animation = `property: position; dur: 2000; easing: easeInOutSine; from: ${letterPosition.x} ${letterPosition.y} ${letterPosition.z}; to: ${letterPosition.x} ${letterPosition.y - (1)} ${letterPosition.z}`;
      letter.setAttribute('animation', animation);
    }, 2000);
    
    setInterval(() => {
      // Faz a animação de subir
      let letterPosition = letter.getAttribute('position');
      let animation = `property: position; dur: 2000; easing: easeInOutSine; from: ${letterPosition.x} ${letterPosition.y} ${letterPosition.z}; to: ${letterPosition.x} ${letterPosition.y + (1)} ${letterPosition.z}`;
      letter.setAttribute('animation', animation);
    }, 4000);
  },

  update: function() {
    console.log(this.el.getAttribute('position').y);
  }
});
