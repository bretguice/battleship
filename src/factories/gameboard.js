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
      var locationArray = this.createLocationArray(location);
      
      if(this.checkForCollisions(locationArray)){
        locationArray.forEach(loc => this.dock[0].locationArr.push(loc));
        this.markShip(locationArray);
        
      }else {
        return
      } 
      
    }

    createLocationArray(location){
        var locationArray = [];
        var iLoc;
        for (let i = 0; i < this.dock[0].shipLength; i++) {
          iLoc = this.yAxis ? location + i * this.size : location + i
          
        locationArray.push(iLoc);
        
    }

    return locationArray;
  }

    highlightShip(location){
      
      var locationArray = [];
      var iLoc;
      for (let i = 0; i < this.dock[0].shipLength; i++) {
        iLoc = this.yAxis ? location + i * this.size : location + i
        
       locationArray.push(iLoc);
       
      }
      if(this.checkForCollisions(locationArray)){
        locationArray.forEach(loc => this.dock[0].locationArr.push(loc));
        
        this.markShip(locationArray);
        
      }else {
        return
      } 
      
      
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

    hoverShip(locationArray) {
      const playerCode = "000";

      this.tiles.forEach(loc => {

      })
      
      locationArray.forEach(loc => {
        const div = document.getElementById(playerCode+loc);
        div.classList.add('hover');
      })


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
      const playerCode = "999";
      const div = document.getElementById(playerCode+location);
      div.classList.add('fired');

      this.tiles[location].isShot = true;
      this.inPlay.forEach(ship => ship.checkHit(location));
        if(this.inPlay.some(e => e.didHit === true)){
          this.hitMessage = 'Hit!';
          div.classList.add('hit');
          if (this.inPlay.some(ship => ship.sunk === true)) {
            const i = this.inPlay.findIndex(ship => ship.sunk);
            this.handleSunkShip(this.inPlay[i]); 
            this.inPlay.splice(i,1);
            this.checkForGameOver();          
            
        }
      } else {
        this.hitMessage =  'Miss!';
        div.classList.add('miss');
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

/*
CPU Setup
*/
    getRandomNumber(min, max){
      return Math.floor(Math.random() * (max - min) +min);
    }

    setupCpuShips(){

      while(this.inPlay.length < 5){
        var random = this.getRandomNumber(0, 100);
        console.log(random);
        let axisTest = this.getRandomNumber(0,2);
        this.yAxis = axisTest === 0 ? true : false;
        console.log(this.yAxis);
        var locationArray = this.createLocationArray(random);
        console.log(locationArray)

        if(this.checkForCollisions(locationArray)){
          locationArray.forEach(loc => this.dock[0].locationArr.push(loc));
          //this.dock[0].locationArr.push(locationArray);
          console.log(this.dock[0]);
          this.inPlay.push(this.dock[0]);
          this.dock.splice(0, 1);
          console.log("true")
          
        } else {
          console.log('false')
          this.setupCpuShips();
        }
        
        }
            

      }
  
  

}

export default GameBoard;

