AFRAME.registerComponent('letter-animation', {
  init: function() {
    const letter = this.el;
    const [ x, y, z ] = letter.getAttribute('position');
    const maxY = y + (letter.getAttribute('scale').x * 0.2);
    
    // Início da animação
    letter.setAttribute('animation', `property: position; dur: 2000; easing: easeInOutSine; from: ${x} ${y} ${z}; to: ${x} ${maxY} ${z}`);
    let up = true;

    letter.addEventListener('animationcomplete', (e) => {
      let animation = `property: position; dur: 2000; easing: easeInOutSine; from: ${x} ${up?maxY:y} ${z}; to: ${x} ${up?y:maxY} ${z}`;
      up = !up;
      letter.setAttribute('animation', animation);
    });

    // letter.addEventListener('animationcomplete__down', () => {
    //   let animation = `property: position; dur: 2000; easing: easeInOutSine; from: ${x} ${y} ${z}; to: ${x} ${maxY} ${z}`;
    //   letter.setAttribute('animation__down', undefined);
    //   letter.setAttribute('animation__up', animation);
    //   console.log('down');
    // });
    
    // var downAnimation = setInterval(() => {
    //   // Faz a animação de descer
    //   let animation = `property: position; dur: 2000; easing: easeInOutSine; from: ${x} ${maxY} ${z}; to: ${x} ${y} ${z}`;
    //   letter.setAttribute('animation', animation);
    // }, 2000);
    
    // var upAnimation = setInterval(() => {
    //   // Faz a animação de subir
    //   let animation = `property: position; dur: 2000; easing: easeInOutSine; from: ${x} ${y} ${z}; to: ${x} ${maxY} ${z}`;
    //   letter.setAttribute('animation', animation);
    // }, 4000);

    // Verificar clique nas letras
    // window.onclick = () => {
    //   const letters = document.querySelectorAll('.letters');
    //   letters.forEach(letter => {
    //     if(letter.states[0] === 'cursor-hovered') {
    //       clearInterval(downAnimation);
    //       clearInterval(upAnimation);
    //       let [x, y, z] = letter.getAttribute('position');
    //       if(letter.parentEl.id == 'last-letter') {
    //         let [x, y, z] = letter.parentEl.getAttribute('position');
    //         letter.parentEl.setAttribute('animation', `property: position; loop: false; dur: 2000; easing: linear; from: ${x} ${y} ${z}; to: ${x} ${y+10} ${z}`);
    //         return;
    //       }
    //       letter.setAttribute('animation', `property: position; loop: false; dur: 2000; easing: linear; from: ${x} ${y} ${z}; to: ${x} ${y+10} ${z}`);
    //     };
    //   });
    // }
  }
});
