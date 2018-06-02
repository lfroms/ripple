// Save/Load/Store Game Data

import Dot from './dot'

const IO = {
  save(data) {
    try {
      localStorage.setItem('ripple-game-data', JSON.stringify(data));
    } catch(err) {
      console.error('Unable to save game data.  Will try again in 5 seconds.');
    }
  },
  load() {
    let savedData = {};
    const activeDots = [];
    const gameData = {};

    try {
      savedData = JSON.parse(localStorage.getItem('ripple-game-data'));
      if (savedData == null) return;
    } catch(err) {
      console.error('Unable to load saved game data.');
      return;
    }

    gameData.totalPoints = savedData.totalPoints;
    gameData.currentPoints = savedData.currentPoints;

    for (const node of savedData.DOMNodes) {
      const e = $(node.e).removeClass('pop')[0];
      activeDots.push(new Dot(e, node.value));
    }

    return {activeDots, gameData};
  }
};

export default IO;
