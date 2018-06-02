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
  autoSpeed: 2200,
  DOMNodes: getDomNodes(),
};

const Defaults = {
  ptDot: 30,
  ptDotVal1: 200,
  ptAutoRipple: 2000,
  ptDotVal10: 2000,
  ptSuperdot: 1000000,
};

setLabels();
let autoSpeedIntervalId;
if (Data.autoSpeed <= 2000) {
  startInterval(Data.autoSpeed);
}

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
  if (Data.currentPoints > Defaults.ptDot && activeDots.length <= 50) {
    $('#dot-u').removeClass('disabled');
  } else {
    $('#dot-u').addClass('disabled');
  }

  if (Data.currentPoints > Defaults.ptDotVal1 && activeDots.length > 50) {
    $('#val-u').removeClass('disabled');
  } else {
    $('#val-u').addClass('disabled');
  }

  if (Data.currentPoints > Defaults.ptAutoRipple && Data.autoSpeed > 500) {
    $('#autoripple-u').removeClass('disabled');
  } else {
    $('#autoripple-u').addClass('disabled');
  }

  if (Data.currentPoints > Defaults.ptDotVal10) {
    $('#val-plus-u').removeClass('disabled');
  } else {
    $('#val-plus-u').addClass('disabled');
  }

  if (Data.currentPoints > Defaults.ptSuperdot && activeDots.length <= 70) {
    $('#superdot-u').removeClass('disabled');
  } else {
    $('#superdot-u').addClass('disabled');
  }
}

$('#dot-u').click(() => {
  if (activeDots.length <= 50) {
    Data.currentPoints -= Defaults.ptDot;

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
  Data.currentPoints -= Defaults.ptDotVal1;

  setLabels();
});

$('#autoripple-u').click(() => {
  if (Data.autoSpeed <= 2200 && Data.autoSpeed >= 500) {
    Data.autoSpeed -= 200;
    Data.currentPoints -= Defaults.ptAutoRipple;

    clearInterval(autoSpeedIntervalId);
    startInterval(Data.autoSpeed);

    setLabels();
  }
});

$('#val-plus-u').click(() => {
  const randDot = Random.rand(0, activeDots.length);

  activeDots[randDot].value += 10;
  Data.currentPoints -= Defaults.ptDotVal10;

  setLabels();
});

$('#superdot-u').click(() => {
  if (activeDots.length <= 70) {
    Data.currentPoints -= Defaults.ptSuperdot;

    const dot = new Dot(null, 10000);
    activeDots.push(dot);

    $('.container').append(dot.e);
  } else {
    $('#superdot-u').addClass('disabled');
  }

  setLabels();
});

function startInterval(interval) {
  autoSpeedIntervalId = setInterval(() => {
    const event = $.Event('mousedown');
    event.pageX = Random.pos().x;
    event.pageY = Random.pos().y;
    $('.container').trigger(event);
  }, interval);
}

function setLabels() {
  document.title = `Total: ${Data.totalPoints}`;
  $('r-total').text(Data.totalPoints);
  $('r-current').text(Data.currentPoints);

  if (Data.totalPoints > 100) { $('.instructions').fadeOut(500); }
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
