const a_scene = document.querySelector('#vr-screen');
const y = 4;
let z = 5;

for(let i = 0; i < 5; i++) {
  let x = -12.6;
  for(let j = 0; j < 5; j++){
    let a_entity = document.createElement('a-entity');
    a_entity.setAttribute('class', 'letters');
    a_entity.setAttribute('position', `${x} ${y} ${z}`);
    a_entity.setAttribute('scale', `3 3 3`);
    a_entity.setAttribute('gltf-model', `url(../assets/models/letter-E.glb)`);
    a_entity.setAttribute('animation', `property: position; dur: 2000; easing: easeInOutSine; from: ${x} ${y} ${z}; to: ${x} ${y+1} ${z}`);
    a_entity.setAttribute('animation__2', `property: rotation; loop: true; dur: 3000; easing: linear; from: 0 0 0; to: 0 360 0`);
    a_entity.setAttribute('letter-animation', 'true');

    a_scene.appendChild(a_entity);
    x += 6.3;
  }
  z -= 6.6;
}

console.log(document.querySelector('.letters').getAttribute('class'));