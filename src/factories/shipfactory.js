/* eslint-disable react/no-this-in-sfc */
import shipType from '../shiptype';

function Ship(i) {
  return {
    shipLength: shipType[i].length,
    type: shipType[i].type,
    shipLocation: null,
    locationArr: [],
    hitLocation: [],
    hit(firedLocation) {
      // assign true of false value to hit status
      const didHit = this.locationArr.includes(firedLocation);
      // if hit occurs, add to hitLocation Array
      if (didHit) {
        this.hitLocation.push(firedLocation);
      }
    },
    isSunk() {
      // if length of hit location array is the same as length of location
       return this.hitLocation.every((e) => this.locationArr.includes(e));
        ;
    },
  };
}

export default Ship;
