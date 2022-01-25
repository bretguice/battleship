function createShip(location) {
  return {
    shipLength: location.length,
    type: [],
    location: [],
    hitLocation: [],
    hit(firedLocation) {
      const didHit = location.includes(firedLocation) ? true : false;
      if (didHit) {
        this.hitLocation.push(firedLocation);
      }
    },
    isSunk() {
      return this.hitLocation.length === this.shipLength ? true : false;
    },
  };
}

export default createShip;
