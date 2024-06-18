AFRAME.registerComponent('name', {
  schema: {
    underlineLetters: {type: 'string', default: ''}
  },

  init: function() {
    const NAME = sessionStorage.getItem('name').normalize("NFD").replace(/[^\w\s]/g, '') ?? 'Aluno';
    for(letter of NAME) {
      this.data.underlineLetters += letter === ' ' ? ' ' : '_';
    }
    this.el.setAttribute('value', this.data.underlineLetters);
  }
});
