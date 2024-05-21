AFRAME.registerComponent('letter-animation', {
  init: function() {
    const letter = this.el;
    const [ x, y, z ] = letter.getAttribute('position');
    const maxY = y + (letter.getAttribute('scale').x * 0.2);
    
    // Início da animação
    letter.setAttribute('animation', `property: position; dur: 2000; easing: easeInOutSine; from: ${x} ${y} ${z}; to: ${x} ${maxY} ${z}`);
    let up = true;

    // Loop de animação
    const animationLoop = (e) => {
      let animation = `property: position; dur: 2000; easing: easeInOutSine; from: ${x} ${up?maxY:y} ${z}; to: ${x} ${up?y:maxY} ${z}`;
      up = !up;
      letter.setAttribute('animation', animation);
      console.log(e);
    };
    letter.addEventListener('animationcomplete', animationLoop);

    setTimeout(() => {
      // Verificar clique nas letras
      window.onclick = () => {
        const letters = document.querySelectorAll('.letters');
        letters.forEach(letter => {
          if(letter.states[0] === 'cursor-hovered') {
            letter.removeEventListener('animationcomplete', animationLoop);
            console.log({letter});
            let [x, y, z] = letter.getAttribute('position');
            if(letter.parentEl.id == 'last-letter') {
              let [x, y, z] = letter.parentEl.getAttribute('position');
              letter.parentEl.setAttribute('animation__final', `property: position; loop: false; dur: 2000; easing: linear; from: ${x} ${y} ${z}; to: ${x} ${y+10} ${z}`);
              return;
            }
            letter.setAttribute('animation', `property: position; loop: false; dur: 2000; easing: linear; from: ${x} ${y} ${z}; to: ${x} ${y+10} ${z}`);
          };
        });
      }
    }, 1000);
  }
});
