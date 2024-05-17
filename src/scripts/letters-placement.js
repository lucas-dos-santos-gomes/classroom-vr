sessionStorage.setItem('name','Lucas');

const a_scene = document.querySelector('#vr-screen');
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const y = 1.3;
let x = -9.2;

getName(sessionStorage.getItem('name'));

// Criando letras e posicionando em cima das mesas
for(let i = 0; i < 5; i++) {
  let z = -1.05;
  for(let j = 0; j < 5; j++){
    const letter = randomLetter(alphabet);

    let a_entity = document.createElement('a-entity');
    a_entity.setAttribute('class', 'letters');
    a_entity.setAttribute('position', `${x} ${y} ${z}`);
    a_entity.setAttribute('scale', `0.8 0.8 0.8`);
    a_entity.setAttribute('rotation', `0 90 0`);
    a_entity.setAttribute('gltf-model', `url(../assets/models/letter-${letter}.glb)`);
    a_entity.setAttribute('animation__2', `property: rotation; loop: true; dur: 3000; easing: linear; from: 0 0 0; to: 0 360 0`);
    a_entity.setAttribute('letter-animation', 'true');

    a_scene.appendChild(a_entity);
    z -= 1.74 ;
  }
  x += 1.83;
};

// Escolha aleatória de letras
function randomLetter(letters) {
  const randomPercent = Math.random() * 100;
  const n_of_l = letters.length;
  for(let i = 0; i <= n_of_l; i++) {
    if(randomPercent <= ((100 / n_of_l) * (i + 1))) {
      return letters[i];
    }
  }
};

function getName(name) {
  const letters_of_name = name.split('');
  let letters_position = {};
  letters_of_name.forEach((letter, index) => {
    letters_position[letter] = [Math.round(Math.random() * 4), Math.round(Math.random() * 4)];
    if(index > 0) {
      for(const teste in letters_position) {
        console.log(teste);
        console.log(letters_position[letter]);
        console.log(letters_position[teste]);
        console.log(letters_position[letter] == letters_position[teste]);
      }
    }
  });
  console.log(letters_position);
  // console.log(letters_of_name);
  // console.log(Math.round(Math.random() * 4));
  // console.log(Math.round(Math.random() * 4));
}