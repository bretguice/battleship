function createShip(location) {
  return {
    shipLength: location.length,
    location: [],
    hitLocation: [],
    hit: function (firedLocation) {
      const didHit = location.includes(firedLocation) ? true : false;
      if (didHit) {
        this.hitLocation.push(firedLocation);
      }
    },
    isSunk: function () {
      return this.hitLocation.length === this.shipLength ? true : false;
    },
  };
}

export default createShip;
