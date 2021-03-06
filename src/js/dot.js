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
      this.e.innerHTML = '+' + (this.value >= 1000 ? parseInt(this.value / 1000) + 'k' : this.value);
    }

    // Limit label to +10k
    if (this.value >= 10000) {
      this.e.classList.add('blue');
    }

    // Store list of ripples to prevent multiple triggers
    this.collidedWith = [];

    // Bind changes to this.value with the innerHTML to auto-change the HTML text.
    watch(this, 'value', () => {
      this.e.innerHTML = '+' + (this.value >= 1000 ? parseInt(this.value / 1000) + 'k' : this.value);
    });
  }
}

export default Dot;
