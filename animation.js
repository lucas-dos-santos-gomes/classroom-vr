const letters = document.querySelector('.letters');

setInterval(() => {
  let animation = "property: position; dur: 2000; easing: easeInOutSine; from: 10 6 -20; to: 10 5 -20";
  letters.setAttribute('animation', animation);
}, 2000);

setInterval(() => {
  let animation = "property: position; dur: 2000; easing: easeInOutSine; from: 10 5 -20; to: 10 6 -20";
  letters.setAttribute('animation', animation);
}, 4000);