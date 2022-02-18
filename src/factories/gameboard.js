/* eslint-disable no-else-return */
/* eslint-disable no-unneeded-ternary */
import Ship from "./shipfactory";

class GameBoard {
  constructor (size) {
    this.size = size;
    this.boardSize = size * size;
    this.board = [];
    this.dock = [];
    this.inPlay = [];
    this.firedShots = [];
    this.gameOver = false;
    this.axis = "y";
    this.hitMessage = "";

  }
/*
 Start of game methods
*/

    setupBoard() {
      for (let i = 0; i < this.boardSize; i ++) {
        this.board.push({
          location: i,
          isShot: false,
          boatPresent: false,
          hit: false,
        });;
      }
    }

    makeShips(){
      const carrier = Ship(0);
      const battleShip = Ship(1);
      const submarine =  Ship(2);
      const destroyer = Ship(3);
      const patrolBoat = Ship(4);
      this.inPlay.push(carrier, battleShip, submarine, destroyer, patrolBoat);
      return this.inPlay;

    }


/*
 Ship placement methods
*/
    rotateShip() {
      // Default axis is y axis.  If default change axis to x.
      if (this.axis === 'y'){
        this.axis = 'x';
      } else if (this.axis === 'x'){
        this.axis = 'y';
      }
      return this.axis;
    }

    placeShip(location, ship){

      for (let i = 0; i < ship.shipLength; i++) {
        if (this.axis === 'y'){ ship.locationArr.push(location + i * this.size) }
        else if (this.axis === 'x')  {ship.locationArr.push(location + i)};
      }
      
    return ship.locationArr;

    }

    markShip(locationArr){
      for (let i = 0; i < locationArr.length; i++){
        this.board[locationArr[i]].boatPresent = true
      }
    }

    checkForCollisions(locationArray) {
        const xArrayBumber = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
        let legalLoc;
        if (locationArray.some((e) => !this.board[e])){
          legalLoc = false;
        } else if (xArrayBumber.some((n)=>[n, n + 1].every((e) => locationArray.includes(e)))) {
          legalLoc = false;
        } else if (locationArray.some((e) => this.board[e].boatPresent)){
          legalLoc = false;
        } else {
          legalLoc = true;
        }

        return legalLoc;
    }



/*
 Attack methods
*/
    checkLegalMove(location){
      let legalMove = true;
      if(this.board[location].isShot)  
      legalMove = false;
      return legalMove;
    }

    receiveAttack(location) {

        this.board[location].isShot = true;
        for (let i = 0; i < this.inPlay.length; i++){
          this.inPlay[i].checkHit(location);
          if (this.inPlay[i].sunk) {
            this.dock.push(this.inPlay[i]);
            this.inPlay.splice(i,1);
          }
        }
        this.checkForGameOver();


    }
    
    checkForGameOver() {
      this.gameOver = (this.inPlay.length === 0) ? true : false;
      return this.gameOver;
    }

}

export default GameBoard;

