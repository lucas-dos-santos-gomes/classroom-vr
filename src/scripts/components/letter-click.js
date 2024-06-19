AFRAME.registerComponent('letter-click', {
  init: function () {
    this.el.onclick = verifyLetterClick;
  }
});



function verifyLetterClick() {
  const letters = document.querySelectorAll('.letters');
  letters.forEach((letter) => {
    if(letter.states[0] === 'cursor-hovered') {
      if(letter.getAttribute('data-letter') === splitName[0]) {
        const A_TEXT = document.querySelector('#a-text-name');
        A_TEXT.setAttribute('value', A_TEXT.getAttribute('value').replace('_', splitName.shift()));
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
        splitName.length === 1 && hiddenLastLetter(splitName);
      } else {
        const A_TEXT = document.querySelector('#a-text-errors');
        A_TEXT.setAttribute('value', A_TEXT.getAttribute('value') ? A_TEXT.getAttribute('value') + 'X ' : 'X ');
      };
    };
  });
}

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