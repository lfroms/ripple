// Ripple Generation

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Random = {
  pos() {
    const x = getRandomInt(75, $(window).width() - 280);
    const y = getRandomInt(100, $(window).height() - 150);
    return {
      x,
      y,
    };
  },
  rand(min, max) {
    return getRandomInt(min, max);
  },
};

export default Random;
