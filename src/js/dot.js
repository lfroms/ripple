import Random from './random';
import WatchJS from 'melanke-watchjs';

const watch = WatchJS.watch;
const DotElement = document.registerElement('r-dot');

class Dot {
  constructor(e, value) {
    // Set the default value of the Dot
    this.value = value ? value : 1;

    // Assign an actual DOM element to this Dot.
    this.e = e ? e : new DotElement();

    if (!e) {
      this.e.style.top = Random.pos().y + 'px';
      this.e.style.left = Random.pos().x + 'px';
      this.e.id = 'dot-' + (Date.now() + Math.random() * 1000).toFixed();
      this.e.innerHTML = '+' + this.value;
    }

    // Store list of ripples to prevent multiple triggers
    this.collidedWith = [];

    // Bind changes to this.value with the innerHTML to auto-change the HTML text.
    if (e && value) {
      watch(this, 'value', () => {
        this.e.innerHTML = '+' + this.value;
      });
    }
  }
}

export default Dot;
