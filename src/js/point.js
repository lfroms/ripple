import Random from './random.js';

const pE = document.registerElement('r-point');

const Point = function() {
  const element = new pE();
  element.style.top = Random.pos(70).y + 'px';
  element.style.left = Random.pos(70).x + 'px';
  element.id = 'point-' + Date.now();

  return element;
}

export default Point;
