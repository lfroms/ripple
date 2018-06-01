// Ripple Generation

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Random = {
  pos: function() {
    let x = getRandomInt(150, $(window).width() - 150);
    let y = getRandomInt(150, $(window).height() - 150);
    return {
      x,
      y
    };
  }
}

export default Random;
