const Helpers = {
  isColliding: function($div1, $div2) {
    if ($div1.length && $div2.length) {
      const d1_height = $div1[0].getBoundingClientRect().height;
      const d1_width = $div1[0].getBoundingClientRect().width;
      const d1_distance_from_top = parseInt($div1.css('top')) + $div1.height() / 2;
      const d1_distance_from_left = parseInt($div1.css('left')) + $div1.width() / 2;

      const d2_height = $div2[0].getBoundingClientRect().height;
      const d2_width = $div2[0].getBoundingClientRect().width;
      const d2_distance_from_top = parseInt($div2.css('top')) + $div2.height() / 2;
      const d2_distance_from_left = parseInt($div2.css('left')) + $div2.width() / 2;

      const radiusTotal = (d1_width / 2) + (d2_width / 2);
      const deltaX = d1_distance_from_left - d2_distance_from_left;
      const deltaY = d1_distance_from_top - d2_distance_from_top;

      if (radiusTotal > Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)) &&
        radiusTotal <= Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)) + 20) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

export default Helpers;
