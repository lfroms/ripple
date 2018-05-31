// Ripple Generation

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Random = {
  pos: function() {
    let x = getRandomInt(100, $(window).width() - 100);
    let y = getRandomInt(100, $(window).height() - 100);
    return {
      x,
      y
    };
  }
}

export default Random;
