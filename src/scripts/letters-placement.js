const A_SCENE = document.querySelector('#vr-screen');
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const y = 1.3;
let x = -9.2;
const NAME = sessionStorage.getItem('name') ?? login();

// Retornar ao login
function login() {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = '../../index.html';
  document.body.appendChild(a);
  a.click();
  return 'Lucas';
}

// Confere se dois arrays são iguais
const checkArrays = (a1, a2) => JSON.stringify(a1) === JSON.stringify(a2);

// Deixa o nome minúsculo, sem espaço e sem caracteres especiais
let splitName = NAME.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split('');
const NAME_LETTERS_AND_POSITIONS = getName(NAME, []);

// Criando letras e posicionando em cima das mesas
for(let i = 0; i < 5; i++) {
  let z = -1.05;
  for(let j = 0; j < 5; j++) {
    let letter = false;
    let chooseLetterName = false;
    for(const EACH_NAME_LETTER_AND_POSITION of NAME_LETTERS_AND_POSITIONS) {
      alphabet = alphabet.filter(l => l != EACH_NAME_LETTER_AND_POSITION[0]);
      chooseLetterName = checkArrays([i, j], EACH_NAME_LETTER_AND_POSITION[1]);
      if(chooseLetterName && NAME_LETTERS_AND_POSITIONS.indexOf(EACH_NAME_LETTER_AND_POSITION) != NAME_LETTERS_AND_POSITIONS.length - 1) letter = EACH_NAME_LETTER_AND_POSITION[0];
    }
    letter = letter || randomLetter(alphabet);

    const A_ENTITY = document.createElement('a-entity');
    A_ENTITY.setAttribute('class', 'letters');
    A_ENTITY.setAttribute('position', `${x} ${y} ${z}`);
    A_ENTITY.setAttribute('scale', `0.8 0.8 0.8`);
    A_ENTITY.setAttribute('rotation', `0 90 0`);
    A_ENTITY.setAttribute('gltf-model', `url(../assets/models/letter-${letter}.glb)`);
    A_ENTITY.setAttribute('animation__rotation', `property: rotation; loop: true; dur: 3000; easing: linear; from: 0 0 0; to: 0 360 0`);
    A_ENTITY.setAttribute('letter-animation', 'true');
    A_ENTITY.setAttribute('data-letter', letter);

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
  const NAME_LETTERS = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split('').filter(letter => letter != ' ');
  NAME_LETTERS.forEach((letter, index) => {
    if(letters_of_name_position[index] === undefined) {
      letters_of_name_position[index] = [letter, [Math.round(Math.random() * 4), Math.round(Math.random() * 4)]];
      
      if(index > 0) {
        for(const EACH_NAME_LETTER_AND_POSITION of letters_of_name_position) {
          if(!(letters_of_name_position[index][1] === EACH_NAME_LETTER_AND_POSITION[1])) {
            if(checkArrays(letters_of_name_position[index][1], EACH_NAME_LETTER_AND_POSITION[1])) {
              letters_of_name_position.pop();
              return getName(name, letters_of_name_position);
            }
          }
        }
      }
    }
  });
  return letters_of_name_position;
}
