import '../css/typefaces.scss';
import '../css/app.scss';
import '../css/normalize.css';

import Random from './random';
import Dot from './dot';
import Helpers from './helpers';

// Custom HTML Elements
const activeDots = [new Dot()];

for (const dot of activeDots) {
  $('.container').append(dot.e);
}


// Environment

$.ripple('.container', {
  debug: false,
  on: 'mousedown',

  opacity: 0.4,
  color: '#bbdefb',
  multi: true,

  duration: 1.5,

  rate(pxPerSecond) {
    return pxPerSecond;
  },

  easing: 'linear',
});

let points = 0;
let current = 0;

// Logic

function checkCollisions() {
  for (const ripple of $('.ripple')) {
    for (const dot of activeDots) {
      if (Helpers.isColliding($(dot.e), $(ripple))) {

        if ($.inArray(ripple, dot.collidedWith) === -1) {
          points += dot.value;
          current += dot.value;

          setLabels();

          dot.collidedWith.push(ripple);

          if (!$(dot.e).hasClass('pop')) {
            $(dot.e).addClass('pop');

            setTimeout(() => {
              $(dot.e).removeClass('pop');
            }, 250);
          }
        }
      }
    }
  }
}

function updateAvailableOptions() {
  if (current > 30 && activeDots.length <= 50) {
    $('#dot-u').removeClass('disabled');
  } else {
    $('#dot-u').addClass('disabled');
  }

  if (current > 100) {
    $('#val-u').removeClass('disabled');
  } else {
    $('#val-u').addClass('disabled');
  }

  if (current > 200) {
    $('#autoripple-u').removeClass('disabled');
  } else {
    $('#autoripple-u').addClass('disabled');
  }
}

$('#dot-u').click(() => {
  if (activeDots.length <= 50) {
    current -= 30;
    const dot = new Dot();
    activeDots.push(dot);
    $('.container').append(dot.e);
  } else {
    $('#dot-u').addClass('disabled');
  }

  setLabels();
});

$('#val-u').click(() => {
  const randDot = Random.rand(0, activeDots.length);

  activeDots[randDot].value++;
  current -= 100;

  setLabels();
});

function setLabels() {
  document.title = `Total: ${points}`;
  $('r-total').text(points);
  $('r-current').text(current);
}

function loop() {
  checkCollisions();
  updateAvailableOptions();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
