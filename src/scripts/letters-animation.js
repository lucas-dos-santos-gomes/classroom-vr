const letters = document.querySelectorAll('.letters');

letters.forEach(letter => {
  // Faz a animação de descer
  setInterval(() => {
    let letterPosition = letter.getAttribute('position');
    let scale = letter.getAttribute('scale');
    let animation = `property: position; dur: 2000; easing: easeInOutSine; from: ${letterPosition.x} ${letterPosition.y} ${letterPosition.z}; to: ${letterPosition.x} ${letterPosition.y - (scale.x * 0.2)} ${letterPosition.z}`;
    letter.setAttribute('animation', animation);
  }, 2000);
  
  setInterval(() => {
    // Faz a animação de subir
    let letterPosition = letter.getAttribute('position');
    let scale = letter.getAttribute('scale');
    let animation = `property: position; dur: 2000; easing: easeInOutSine; from: ${letterPosition.x} ${letterPosition.y} ${letterPosition.z}; to: ${letterPosition.x} ${letterPosition.y + (scale.x * 0.2)} ${letterPosition.z}`;
    letter.setAttribute('animation', animation);
  }, 4000);
});