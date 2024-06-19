var errors = 0;

AFRAME.registerComponent('letter-click', {
  schema: {
    // errors: {type: 'number', default: 0},
    alert: {type: 'boolean', default: true},
    start: {default: undefined},
    rAF: {default: window.requestAnimationFrame},
    rAFStop: {default: window.cancelAnimationFrame},
    interval: {default: undefined},
  },
  init: function() {
    this.el.onclick = () => errors += verifyLetterClick();
  },
  tick: function() {
    if(errors >= 3) {
      if(this.data.alert) {
        alert('GAME OVER: Quantidade máxima de erros permitida');
        this.data.alert = false;
      };
      sessionStorage.removeItem('name');
      login();
    };
  },
});

window.addEventListener("gamepadconnected", (e) => {
  const gp = navigator.getGamepads()[e.gamepad.index];
  console.log(e);
  console.log(`Gamepad connected at index ${gp.index}: ${gp.id}. It has ${gp.buttons.length} buttons and ${gp.axes.length} axes.`);
  console.log(gp.buttons);

  gameLoop();
});

var start;
var rAF = window.requestAnimationFrame;
var rAFStop = window.cancelAnimationFrame;

window.addEventListener("gamepaddisconnected", function() {
  gamepadInfo.innerHTML = "Waiting for gamepad.";

  rAFStop(start);
});

if(!('GamepadEvent' in window)) {
  // No gamepad events available, poll instead.
  var interval = setInterval(pollGamepads, 500);
}

function pollGamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  for(let i = 0; i < gamepads.length; i++) {
    var gp = gamepads[i];
    if(gp) {
      gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
      gameLoop();
      clearInterval(interval);
    }
  }
}

function buttonPressed(b) {
  if(typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}


var pauseClick = false;
var crouchDown = true;
function gameLoop() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if(!gamepads) return;

  // 0 = C / 1 = A / 4 = D / 3 = B
  var gp = gamepads[0];
  if(!pauseClick) {
    if(buttonPressed(gp.buttons[7])) { // R1
      console.log(gp.buttons[7]);
      errors += verifyLetterClick();
    } else if(buttonPressed(gp.buttons[6])) { // R2
      crouch(document.querySelector('a-camera'), crouchDown ? 'down' : 'up');
      crouchDown = !crouchDown;
    } else if(buttonPressed(gp.buttons[0])) {
      console.log(gp.buttons[0]);
    } else if(buttonPressed(gp.buttons[1])) {
      console.log(gp.buttons[1]);
    }
    pauseClick = true;
  }
  pauseClick = gp.buttons.filter(e => e.pressed || e.touched).length > 0 && pauseClick;

  start = rAF(gameLoop);
};

// Retorna à página de Login
function login() {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = '../../index.html';
  document.body.appendChild(a);
  a.click();
  return 'Lucas';
}

// Verifica o clique nas letras e determina uma ação
function verifyLetterClick() {
  let count = 0;
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
          alert('PARABÉNS! Você concluiu o jogo com excelência!');
          setTimeout(() => login(), 10000);
          return 0;
        }
        letter.setAttribute('animation', `property: position; loop: false; dur: 2000; easing: linear; from: ${x} ${y} ${z}; to: ${x} ${y+10} ${z}`);
        setTimeout(() => {
          letter.parentEl.removeChild(letter);
        }, 500);
        splitName.length === 1 && hiddenLastLetter(splitName);
      } else {
        const A_TEXT = document.querySelector('#a-text-errors');
        A_TEXT.setAttribute('value', A_TEXT.getAttribute('value') ? A_TEXT.getAttribute('value') + 'X ' : 'X ');
        count = 1;
      };
    };
  });
  return count;
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

function crouch(element, direction) {
  const position = element.getAttribute('position');
  const axisY = position.y;
  let count = axisY;

  let intervalId = setInterval(() => {
    count = (direction === 'down' ? (count - 0.1) : (count + 0.1));
    element.setAttribute('position', {
      x: element.getAttribute('position').x,
      y: direction ==='down' ? (count >= 0.8 ? count : 0.8) : (count <= 1.6 ? count : 1.6),
      z: element.getAttribute('position').z,
    });
    direction === 'down' ? (count <= 0.8 && clearInterval(intervalId)) : (count >= 1.6 && clearInterval(intervalId));
  }, 18);
}