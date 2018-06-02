const Helpers = {
  isColliding($div1, $div2) {
    if ($div1.length && $div2.length) {
      const div1Width = $div1[0].getBoundingClientRect().width;
      const div1DistTop = parseInt($div1.css('top'), 10) + ($div1.height() / 2);
      const div1DistLeft = parseInt($div1.css('left'), 10) + ($div1.width() / 2);

      const div2Width = $div2[0].getBoundingClientRect().width;
      const div2DistTop = parseInt($div2.css('top'), 10) + ($div2.height() / 2);
      const div2DistLeft = parseInt($div2.css('left'), 10) + ($div2.width() / 2);

      const radiusTotal = (div1Width / 2) + (div2Width / 2);
      const deltaX = div1DistLeft - div2DistLeft;
      const deltaY = div1DistTop - div2DistTop;

      if (radiusTotal > Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
};

export default Helpers;
