const a_scene = document.querySelector('#vr-screen');
const y = 4.2;
let z = 5;
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n',/*'o','p','q','r','s','t','u','w','x','y','z'*/];

for(let i = 0; i < 5; i++) {
  let x = -12.6;
  for(let j = 0; j < 5; j++){
    const letter = randomLetter(alphabet);

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

function randomLetter(letters) {
  const randomPercent = Math.random() * 100;
  const n_of_l = letters.length;
  if(randomPercent <= (100 / n_of_l)) {
    return letters[0];
  } else if(randomPercent <= ((100 / n_of_l) * 2)) {
    return letters[1];
  } else if(randomPercent <= ((100 / n_of_l) * 3)) {
    return letters[2];
  } else if(randomPercent <= ((100 / n_of_l) * 4)) {
    return letters[3];
  } else if(randomPercent <= ((100 / n_of_l) * 5)) {
    return letters[4];
  } else if(randomPercent <= ((100 / n_of_l) * 6)) {
    return letters[5];
  } else if(randomPercent <= ((100 / n_of_l) * 7)) {
    return letters[6];
  } else if(randomPercent <= ((100 / n_of_l) * 8)) {
    return letters[7];
  } else if(randomPercent <= ((100 / n_of_l) * 9)) {
    return letters[8];
  } else if(randomPercent <= ((100 / n_of_l) * 10)) {
    return letters[9];
  } else if(randomPercent <= ((100 / n_of_l) * 11)) {
    return letters[10];
  } else if(randomPercent <= ((100 / n_of_l) * 12)) {
    return letters[11];
  } else {
    return letters[12];
  }
};