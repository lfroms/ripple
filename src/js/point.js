import Random from './random.js';

const pE = document.registerElement('r-point');

class Point {
  constructor() {
    this.e = new pE();
    this.e.style.top = Random.pos().y + 'px';
    this.e.style.left = Random.pos().x + 'px';
    this.e.id = 'point-' + (Date.now() + Math.random() * 1000).toFixed();

    this.id = this.e.id;

    this.value = 1;
    this.e.innerHTML = '+' + this.value;
  }
}

export default Point;
