import '../css/app.scss';
import '../css/normalize.css';

import Random from './random.js';
import Point from './point.js';

// Custom HTML Elements

$(".container").append(Point);

// Environment

$.ripple(".container", {
  debug: false,
  on: 'mousedown',

  opacity: 0.4,
  color: "#bbdefb",
  multi: true,

  duration: 1.5,

  rate: function(pxPerSecond) {
    return pxPerSecond;
  },

  easing: 'linear'
});

// Logic
