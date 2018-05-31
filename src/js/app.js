import '../css/app.scss';
import '../css/normalize.css';

import Random from './random.js';
import Point from './point.js';
import Helpers from './helpers.js';

// Custom HTML Elements
let activePoints = [new Point, new Point];

$(".container").append(activePoints[0].e);
$(".container").append(activePoints[1].e);

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

let points = 0;

// Logic

function checkCollisions() {
  for (let point of activePoints) {
    for (let ripple of $(".ripple"))
    if (Helpers.isColliding($(point.e), $(ripple))) {
      if (!$(point.e).hasClass("pop")) {
        $(point.e).addClass("pop");

        setTimeout(function() {
          $(point.e).removeClass("pop");
        }, 250);
      }

      points += point.value;
      document.title = points;
    }
  }
}

function loop() {
  checkCollisions();
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
