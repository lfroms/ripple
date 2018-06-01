import Random from './random.js';
import WatchJS from 'melanke-watchjs';

const watch = WatchJS.watch;
const unwatch = WatchJS.unwatch;
const callWatchers = WatchJS.callWatchers;

const DotElement = document.registerElement('r-dot');

class Dot {
  constructor() {
    this.e = new DotElement();
    this.collidedWith = [];
    this.e.style.top = Random.pos().y + 'px';
    this.e.style.left = Random.pos().x + 'px';
    this.e.id = 'dot-' + (Date.now() + Math.random() * 1000).toFixed();

    this.id = this.e.id;

    this.value = 1;
    this.e.innerHTML = '+' + this.value;

    watch(this, 'value', () => {
      this.e.innerHTML = '+' + this.value;
    });
  }
}

export default Dot;
