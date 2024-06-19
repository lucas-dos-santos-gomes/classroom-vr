const form = document.querySelector('form');
const input = form.querySelector('#name');

const saveName = () => sessionStorage.setItem('name', input.value.trim());

function sigin() {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = './src/pages/classroom.html';
  document.body.appendChild(a);
  a.click();
};

form.onsubmit = e => {
  e.preventDefault();
  saveName();
  sigin();
};
