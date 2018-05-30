// Ripple Generation

const Random = {
  pos: function(diameter) {
    let x = (Math.random() * ($(document).width() - diameter)).toFixed();
    let y = (Math.random() * ($(document).height() - diameter)).toFixed();
    return {x, y};
  }
}

export default Random;
