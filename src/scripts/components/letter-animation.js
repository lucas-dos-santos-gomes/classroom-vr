AFRAME.registerComponent('letter-animation', {
  init: function() {
    const NAME = sessionStorage.getItem('name') ?? login();
    let splitName = NAME.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split('');
    const letterEl = this.el;
    const [ x, y, z ] = letterEl.getAttribute('position');
    const maxY = y + (letterEl.getAttribute('scale').x * 0.2);
    
    // Início da animação
    letterEl.setAttribute('animation', `property: position; dur: 2000; easing: easeInOutSine; from: ${x} ${y} ${z}; to: ${x} ${maxY} ${z}`);
    let up = true;

    // Loop de animação
    const animationLoop = () => {
      let animation = `property: position; dur: 2000; easing: easeInOutSine; from: ${x} ${up?maxY:y} ${z}; to: ${x} ${up?y:maxY} ${z}`;
      up = !up;
      letterEl.setAttribute('animation', animation);
    };
    letterEl.addEventListener('animationcomplete', animationLoop);

    setTimeout(() => {
      // Verificar clique nas letras
      // window.onclick = () => {
      //   const letters = document.querySelectorAll('.letters');
      //   letters.forEach((letter) => {
      //     if(letter.states[0] === 'cursor-hovered') {
      //       if(letter.states[0] === 'cursor-hovered' && letter.getAttribute('data-letter') === splitName[0]) {
      //         const A_TEXT = document.querySelector('#a-text-name');
      //         A_TEXT.setAttribute('value', A_TEXT.getAttribute('value').replace('_', splitName.shift()));
      //         let [x, y, z] = letter.getAttribute('position');
      //         if(letter.parentEl.id == 'last-letter') {
      //           let [x, y, z] = letter.parentEl.getAttribute('position');
      //           letter.parentEl.setAttribute('animation__final', `property: position; loop: false; dur: 2000; easing: linear; from: ${x} ${y} ${z}; to: ${x} ${y+10} ${z}`);
      //           return;
      //         }
      //         letter.setAttribute('animation', `property: position; loop: false; dur: 2000; easing: linear; from: ${x} ${y} ${z}; to: ${x} ${y+10} ${z}`);
      //         setTimeout(() => {
      //           letter.parentEl.removeChild(letter);
      //         }, 500);
      //         splitName.length === 1 && hiddenLastLetter(splitName);
      //       } else if(letter.states[0] === 'cursor-hovered' && letter.getAttribute('data-letter') !== splitName[0]) {
      //         console.log('teste');
      //         const A_TEXT = document.querySelector('#a-text-errors');
      //         A_TEXT.setAttribute('value', A_TEXT.getAttribute('value') += 'X ');
      //       };
      //     };
      //   });
      // }
    }, 2000);
  }
});

// Retornar ao login
function login() {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = '../../index.html';
  document.body.appendChild(a);
  a.click();
  return 'Lucas';
}