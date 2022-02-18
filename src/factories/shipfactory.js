/* eslint-disable react/no-this-in-sfc */
import shipType from '../shiptype';

class Ship {
  constructor (i) {
    this.shipLength = shipType[i].length;
    this.type = shipType[i].type;
    this.locationArr = [];
    this.hitLocation = [];
    this.sunk = false;
  }

    isSunk() {
      if (this.locationArr.every((e) => this.hitLocation.includes(e)) === true) {
        this.sunk = true;
      } else {
        this.sunk = false;
      }

      return this.sunk;
        
    }


    checkHit(firedLocation) {
      // assign true of false value to hit status
      const didHit = this.locationArr.includes(firedLocation);
      // if hit occurs, add to hitLocation Array
      if (didHit) {
        this.hitLocation.push(firedLocation);
        this.isSunk();
        // this.isSunk();
      }

      return didHit;
    }

}

export default Ship;
