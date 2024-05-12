AFRAME.registerComponent('letter-animation', {
  init: function() {
    const letter = this.el;
    const [ x, y, z ] = letter.getAttribute('position');
    const maxY = y + 1;
    
    // Início da animação
    letter.setAttribute('animation', `property: position; dur: 2000; easing: easeInOutSine; from: ${x} ${y} ${z}; to: ${x} ${maxY} ${z}`);
    
    setInterval(() => {
      // Faz a animação de descer
      let animation = `property: position; dur: 2000; easing: easeInOutSine; from: ${x} ${maxY} ${z}; to: ${x} ${y} ${z}`;
      letter.setAttribute('animation', animation);
    }, 2000);
    
    setInterval(() => {
      // Faz a animação de subir
      let animation = `property: position; dur: 2000; easing: easeInOutSine; from: ${x} ${y} ${z}; to: ${x} ${maxY} ${z}`;
      letter.setAttribute('animation', animation);
    }, 4000);
  }
});
