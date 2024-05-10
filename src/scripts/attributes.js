AFRAME.registerComponent('meu-controle', {
  init: () => {
    let el = this.el;
    let velocidade = 0.5; // você pode ajustar a velocidade conforme necessário

    window.addEventListener('keydown', e => {
      console.log(el);
      let pos = el.getAttribute('position');

      switch (e.key) {
        case 'i': // mover para frente
          pos.z -= velocidade;
          break;
        case 'k': // mover para trás
          pos.z += velocidade;
          break;
        case 'j': // mover para a esquerda
          pos.x -= velocidade;
          break;
        case 'l': // mover para a direita
          pos.x += velocidade;
          break;
        default:
          break;
      }

      el.setAttribute('position', pos);
    });
  }
});
