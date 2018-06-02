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

// COLLISION CHECKERS ==

function checkCollisions() {
  for (const ripple of $('.ripple')) {
    for (const dot of activeDots) {
      if (Helpers.isColliding($(dot.e), $(ripple))) {

        // Check if already involved in collision.
        if ($.inArray(ripple, dot.collidedWith) === -1) {
          Data.totalPoints += dot.value;
          Data.currentPoints += dot.value;

          setLabels();

          dot.collidedWith.push(ripple);

          // Do CSS animation on collision
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

// UPGRADE CHECKERS ====

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

// UPGRADE CLICK LISTENERS =======

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

// MISC FUNCTIONS ======

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

// MAIN LOOP ===========

function loop() {
  checkCollisions();
  updateAvailableOptions();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

// COLLECT DOT DATA ====

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

// AUTOSAVE ============

window.setInterval(() => {
  Data.DOMNodes = getDomNodes();
  IO.save(Data);
}, 5000);


// KEY LISTENERS =======

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

  if (e.which === 67) {
    const options = '"10m" - adds 10 million points\n"bigVal" - sets value of all dots to ~1k\n"super10" - adds 10 superdots\n"50dot" - adds 50 standard dots\n"clr" - reset everything';
    const name = prompt(`Enter the name of the feature to test.\n${options}`);

    if (name === '10m') {
      Data.currentPoints += 10000000;
    } else if (name === 'bigVal') {
      for (const dot of activeDots) {
        dot.value = 1001;
      }
    } else if (name === 'super10') {
      for (let i = 0; i < 10; i++) {
        const dot = new Dot(null, 10000);
        activeDots.push(dot);
        $('.container').append(dot.e);
      }
    } else if (name === '50dot') {
      for (let i = 0; i < 50; i++) {
        activeDots.push(new Dot());
      }

      for (const dot of activeDots) {
        $('.container').append(dot.e);
      }
    } else if (name === 'clr') {
      activeDots.length = 0;
      $('r-dot').remove();

      Data.totalPoints = 0;
      Data.currentPoints = 0;
      Data.autoSpeed = 2200;
      clearInterval(autoSpeedIntervalId);

      setLabels();

      activeDots.push(new Dot());
      $('.container').append(activeDots[0].e);
    }

    e.preventDefault();
  }
});
