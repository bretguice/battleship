import Ship from "./shipfactory";
import Player from "./playerfactor";

class GameBoard {
  constructor (size) {
    this.size = size;
    this.boardSize = size * size;
    this.tiles = [];
    this.dock = [];
    this.inPlay = [];
    this.graveyard = [];
    this.firedShots = [];
    this.gameOver = false;
    this.yAxis = true;
    this.hitMessage = "";
    this.sunkMessage = "";

  }
/*
 Start of game methods
*/

    setupBoard() {
      for (let i = 0; i < this.boardSize; i ++) {
        this.tiles.push({
          location: i,
          isShot: false,
          boatPresent: false,
          hit: false,
        });;
      }
    }

    createShips(){
      const carrier = new Ship(0);
      const battleShip = new Ship(1);
      const submarine = new Ship(2);
      const destroyer = new Ship(3);
      const patrolBoat = new Ship(4);

      this.dock.push(carrier, battleShip, submarine, destroyer, patrolBoat);

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

    placeShip(location){
      var clickLocation;
      var div;
      var locationArray = [];
      var iLoc;
      for (let i = 0; i < this.dock[0].shipLength; i++) {
        iLoc = this.yAxis ? location + i * this.size : location + i
        
       locationArray.push(iLoc);
       
      }
      
      if(this.checkForCollisions(locationArray)){
        this.dock[0].locationArr.push(locationArray);
        this.markShip(locationArray);
        
      }else {
        return
      } 
      
    }

    placedShip(clickLocation){
      
      //this.createLocationArray(clickLocation);
      
    }

    markShip(locationArray){
      const playerCode = "000";
     
      
      locationArray.forEach(loc => {
        this.tiles[loc].boatPresent = true;
        const div = document.getElementById(playerCode+loc);
        div.classList.add('ship');
        
      })

      this.inPlay.push(this.dock[0]);
      this.dock.splice(0, 1);
   
    }

    checkForCollisions(locationArray) {
        const xArrayBumber = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
        let legalLoc;
        if (locationArray.some((e) => !this.tiles[e])){
          legalLoc = false;
        } else if (xArrayBumber.some((n)=>[n, n + 1].every((e) => locationArray.includes(e)))) {
          legalLoc = false;
        } else if (locationArray.some((e) => this.tiles[e].boatPresent)){
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
      if(this.tiles[location].isShot)  
      legalMove = false;
      return legalMove;
    }

    receiveAttack(location) {

      this.this[location].isShot = true;
      this.inPlay.forEach(ship => ship.checkHit(location));
        if(this.inPlay.some(e => e.didHit === true)){
          this.hitMessage = 'Hit!';
          if (this.inPlay.some(ship => ship.sunk === true)) {
            const i = this.inPlay.findIndex(ship => ship.sunk);
            this.handleSunkShip(this.inPlay[i]); 
            this.inPlay.splice(i,1);
            this.checkForGameOver();          
            
        }
      } else {
        this.hitMessage =  'Miss!';
      }         
  }

    handleSunkShip(ship) {
      this.sunkMessage = `${ship.shipType} is sunk`;
      this.graveyard.push(ship);
      
  }
    
    checkForGameOver() {
      this.gameOver = (this.inPlay.length === 0) ? true : false;
      return this.gameOver;
    }

}

export default GameBoard;

