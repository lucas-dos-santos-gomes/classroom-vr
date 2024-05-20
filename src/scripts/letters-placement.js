sessionStorage.setItem('name','João Felipe');

const A_SCENE = document.querySelector('#vr-screen');
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const y = 1.3;
let x = -9.2;
const NAME = sessionStorage.getItem('name') ?? 'Lucas';
let letters_of_name_position = {};

// Confere se dois arrays são iguais
const checkArrays = (a1, a2) => JSON.stringify(a1) === JSON.stringify(a2);

letters_of_name_position = getName(NAME, letters_of_name_position);

// Criando letras e posicionando em cima das mesas
for(let i = 0; i < 5; i++) {
  let z = -1.05;
  for(let j = 0; j < 5; j++) {
    let letter = false;
    let chooseLetterName = false;
    for(const each_letter_name in letters_of_name_position) {
      alphabet = alphabet.filter(l => l != each_letter_name);
      chooseLetterName = checkArrays([i, j], letters_of_name_position[each_letter_name]);
      if(chooseLetterName) letter = each_letter_name;
    }
    letter = letter || randomLetter(alphabet);

    const A_ENTITY = document.createElement('a-entity');
    A_ENTITY.setAttribute('class', 'letters');
    A_ENTITY.setAttribute('position', `${x} ${y} ${z}`);
    A_ENTITY.setAttribute('scale', `0.8 0.8 0.8`);
    A_ENTITY.setAttribute('rotation', `0 90 0`);
    A_ENTITY.setAttribute('gltf-model', `url(../assets/models/letter-${letter}.glb)`);
    A_ENTITY.setAttribute('animation__2', `property: rotation; loop: true; dur: 3000; easing: linear; from: 0 0 0; to: 0 360 0`);
    A_ENTITY.setAttribute('letter-animation', 'true');

    A_SCENE.appendChild(A_ENTITY);
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

// Divide as letras do nome nas posições da sala
function getName(name, letters_of_name_position) {
  const letters_of_name = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split('').filter(letter => letter != ' ');
  console.log(letters_of_name);
  letters_of_name.forEach((letter, index) => {
    if(letters_of_name_position[letter] === undefined) {
      letters_of_name_position[letter] = [Math.round(Math.random() * 4), Math.round(Math.random() * 4)];
      
      if(index > 0) {
        for(const each_letter_name in letters_of_name_position) {
          if(!(letters_of_name_position[letter] === letters_of_name_position[each_letter_name])) {
            if(checkArrays(letters_of_name_position[letter], letters_of_name_position[each_letter_name])) {
              delete letters_of_name_position[each_letter_name];
              return getName(name, letters_of_name_position);
            }
          }
        }
      }
    }
  });
  return letters_of_name_position;
}