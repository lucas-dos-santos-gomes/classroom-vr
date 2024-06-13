AFRAME.registerComponent('letter-animation', {
  init: function() {
    const NAME = sessionStorage.getItem('name') ?? 'Lucas';
    let splitName = NAME.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split('').filter(letter => letter != ' ');
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
      window.onclick = () => {
        const letters = document.querySelectorAll('.letters');
        letters.forEach(letter => {
          if(letter.states[0] === 'cursor-hovered' && letter.getAttribute('data-letter') === splitName[0]) {
            let [x, y, z] = letter.getAttribute('position');
            if(letter.parentEl.id == 'last-letter') {
              let [x, y, z] = letter.parentEl.getAttribute('position');
              letter.parentEl.setAttribute('animation__final', `property: position; loop: false; dur: 2000; easing: linear; from: ${x} ${y} ${z}; to: ${x} ${y+10} ${z}`);
              return;
            }
            letter.setAttribute('animation', `property: position; loop: false; dur: 2000; easing: linear; from: ${x} ${y} ${z}; to: ${x} ${y+10} ${z}`);
            setTimeout(() => {
              letter.parentEl.removeChild(letter);
            }, 500);
            splitName.shift();
            splitName.length === 1 && hiddenLastLetter(splitName);
          };
        });
      }
    }, 2000);
  }
});

// Última letra escondida
function hiddenLastLetter(splitName) {
  const A_SCENE = document.querySelector('#vr-screen');
  const A_ENTITY = document.createElement('a-entity');
  const A_LETTER = document.createElement('a-entity');
  const A_CROWN = document.createElement('a-entity');

  A_ENTITY.setAttribute('id', 'last-letter');
  A_ENTITY.setAttribute('position', '0.2 0.83 -4.55');
  A_ENTITY.setAttribute('animation', 'property: rotation; loop: true; dur: 3000; easing: linear; from: 0 0 0; to: 0 360 0');
  
  A_LETTER.setAttribute('class', 'letters');
  A_LETTER.setAttribute('position', '0 0 0');
  A_LETTER.setAttribute('scale', '0.5 0.5 0.5');
  A_LETTER.setAttribute('gltf-model', `url(../assets/models/letter-${splitName[0]}.glb)`);
  A_LETTER.setAttribute('data-letter', splitName[0]);

  A_CROWN.setAttribute('id', 'crown');
  A_CROWN.setAttribute('position', '0 0.12 0');
  A_CROWN.setAttribute('scale', '0.2 0.2 0.2');
  A_CROWN.setAttribute('gltf-model', 'url(../assets/models/crown.glb)');

  A_ENTITY.appendChild(A_LETTER);
  A_ENTITY.appendChild(A_CROWN);
  A_SCENE.appendChild(A_ENTITY);
}

// Última letra escondida
// <a-entity id="last-letter" rotation="0 90 0" position="0.2 0.83 -4.55" animation="property: rotation; loop: true; dur: 3000; easing: linear; from: 0 0 0; to: 0 360 0">
//   <a-entity class="letters" position="0 0 0" scale="0.5 0.5 0.5" gltf-model="url(../assets/models/letter-z.glb)">
//   </a-entity>
//   <a-entity id="crown" position="0 0.12 0" scale="0.2 0.2 0.2" gltf-model="url(../assets/models/crown.glb)">
//   </a-entity>
// </a-entity>