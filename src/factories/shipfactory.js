/* eslint-disable react/no-this-in-sfc */
import shipType from '../shiptype';

function Ship(i) {
  return {
    shipLength: shipType[i].length,
    type: shipType[i].type,
    shipLocation: 1000000,
    locationArr: [],
    hitLocation: [],
    sunk: false,
    
    isSunk() {
      if (this.locationArr.every((e) => this.hitLocation.includes(e)) === true) {
        this.sunk = true;
      } else {
        this.sunk = false;
      }

      return this.sunk;
        
    },


    checkHit(firedLocation) {
      // assign true of false value to hit status
      const didHit = this.locationArr.includes(firedLocation);
      // if hit occurs, add to hitLocation Array
      if (didHit) {
        this.hitLocation.push(firedLocation);
        // this.isSunk();
      }

      return didHit;
    },

  };
}

export default Ship;
