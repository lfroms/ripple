import '../css/typefaces.scss';
import '../css/app.scss';
import '../css/normalize.css';

import Random from './random.js';
import Dot from './dot.js';
import Helpers from './helpers.js';

// Custom HTML Elements
let activeDots = [new Dot];

for (let dot of activeDots) {
  $(".container").append(dot.e);
  console.log(activeDots[0].e);

}


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
let current = 0;

// Logic

function checkCollisions() {
  for (let ripple of $(".ripple")) {
    for (let dot of activeDots) {
      if (Helpers.isColliding($(dot.e), $(ripple))) {

        if ($.inArray(ripple, dot.collidedWith) === -1) {
          points += dot.value;
          current += dot.value;

          document.title = 'Total: ' + points;

          dot.collidedWith.push(ripple);

          if (!$(dot.e).hasClass("pop")) {
            $(dot.e).addClass("pop");

            setTimeout(function() {
              $(dot.e).removeClass("pop");
            }, 250);
          }

          $('r-total').text(points);
          $('r-current').text(current);
        }
      }
    }
  }
}

function updateAvailableOptions() {
  if (current > 30 && activeDots.length <= 50) {
    $("#dot-u").removeClass("disabled");
  } else {
    $("#dot-u").addClass("disabled");
  }

  if (current > 100) {
    $("#val-u").removeClass("disabled");
  } else {
    $("#val-u").addClass("disabled");
  }

  if (current > 200) {
    $("#autoripple-u").removeClass("disabled");
  } else {
    $("#autoripple-u").addClass("disabled");
  }
}

$("#dot-u").click(function() {
  if (activeDots.length <= 50) {
    current = current - 30;
    const dot = new Dot;
    activeDots.push(dot);
    $(".container").append(dot.e);
  } else {
    $("#dot-u").addClass("disabled");
  }
});

$("#val-u").click(function() {
  const randDot = Random.rand(0, activeDots.length);

  activeDots[randDot].value++;
  current = current - 100;
});

function loop() {
  checkCollisions();
  updateAvailableOptions();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
