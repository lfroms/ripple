import '../css/typefaces.scss';
import '../css/app.scss';
import '../css/normalize.css';

import Random from './random';
import Dot from './dot';
import Helpers from './helpers';
import IO from './io';

// Initialize Environment
const savedData = IO.load();
const activeDots = savedData ? savedData.activeDots : [new Dot()];

for (const dot of activeDots) {
  $('.container').append(dot.e);
}

const Data = savedData ? savedData.gameData : {
  totalPoints: 0,
  currentPoints: 0,
  DOMNodes: getDomNodes(),
};

setLabels();

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

// Logic

function checkCollisions() {
  for (const ripple of $('.ripple')) {
    for (const dot of activeDots) {
      if (Helpers.isColliding($(dot.e), $(ripple))) {

        if ($.inArray(ripple, dot.collidedWith) === -1) {
          Data.totalPoints += dot.value;
          Data.currentPoints += dot.value;

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
  if (Data.currentPoints > 30 && activeDots.length <= 50) {
    $('#dot-u').removeClass('disabled');
  } else {
    $('#dot-u').addClass('disabled');
  }

  if (Data.currentPoints > 100) {
    $('#val-u').removeClass('disabled');
  } else {
    $('#val-u').addClass('disabled');
  }

  if (Data.currentPoints > 200) {
    $('#autoripple-u').removeClass('disabled');
  } else {
    $('#autoripple-u').addClass('disabled');
  }
}

$('#dot-u').click(() => {
  if (activeDots.length <= 50) {
    Data.currentPoints -= 30;

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
  Data.currentPoints -= 100;

  setLabels();
});

function setLabels() {
  document.title = `Total: ${Data.totalPoints}`;
  $('r-total').text(Data.totalPoints);
  $('r-current').text(Data.currentPoints);
}

function loop() {
  checkCollisions();
  updateAvailableOptions();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);


// Game Stats
function getDomNodes() {
  const data = [];

  for (const dot of activeDots) {
    data.push({
      e: dot.e.outerHTML,
      value: dot.value,
    });
  }

  return data;
}

window.setInterval(() => {
  Data.DOMNodes = getDomNodes();
  IO.save(Data);
}, 5000);

$(window).keydown((e) => {
  if (e.which === 83) {
    $('.notification').show().css('display', 'flex');

    Data.DOMNodes = getDomNodes();
    IO.save(Data);

    setTimeout(() => {
      $('.notification').fadeOut(300);
    }, 1000);

    e.preventDefault();
  }
});
