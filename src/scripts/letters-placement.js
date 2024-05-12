const a_scene = document.querySelector('#vr-screen');
const y = 4.2;
let z = 5;

for(let i = 0; i < 5; i++) {
  let x = -12.6;
  for(let j = 0; j < 5; j++){
    const letter = randomLetter();

    let a_entity = document.createElement('a-entity');
    a_entity.setAttribute('class', 'letters');
    a_entity.setAttribute('position', `${x} ${y} ${z}`);
    a_entity.setAttribute('scale', `3 3 3`);
    a_entity.setAttribute('gltf-model', `url(../assets/models/letter-${letter}.glb)`);
    a_entity.setAttribute('animation__2', `property: rotation; loop: true; dur: 3000; easing: linear; from: 0 0 0; to: 0 360 0`);
    a_entity.setAttribute('letter-animation', 'true');

    a_scene.appendChild(a_entity);
    x += 6.3;
  }
  z -= 6.6;
};

function randomLetter() {
  const randomPercent = Math.random() * 100;
  const n_of_l = 10;
  if(randomPercent <= (100 / n_of_l)) {
    return 'a';
  } else if(randomPercent <= ((100 / n_of_l) * 2)) {
    return 'b';
  } else if(randomPercent <= ((100 / n_of_l) * 3)) {
    return 'c';
  } else if(randomPercent <= ((100 / n_of_l) * 4)) {
    return 'd';
  } else if(randomPercent <= ((100 / n_of_l) * 5)) {
    return 'e';
  } else if(randomPercent <= ((100 / n_of_l) * 6)) {
    return 'f';
  } else if(randomPercent <= ((100 / n_of_l) * 7)) {
    return 'g';
  } else if(randomPercent <= ((100 / n_of_l) * 8)) {
    return 'h';
  } else if(randomPercent <= ((100 / n_of_l) * 9)) {
    return 'i';
  } else {
    return 'j';
  }
};