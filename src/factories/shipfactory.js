/* eslint-disable react/no-this-in-sfc */
import shipType from '../shiptype';

class Ship {
  constructor (i) {
    this.shipLength = shipType[i].shipLength;
    this.shipType = shipType[i].type;
    this.locationArr = [];
    this.hitLocation = [];
    this.didHit = false;
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
       if (this.locationArr.includes(firedLocation)){
         this. didHit = true;
         this.hitLocation.push(firedLocation);
         this.isSunk();
       } else {
         this.didHit = false;
       }

    }

}

export default Ship;
