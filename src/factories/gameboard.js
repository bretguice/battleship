import Ship from "./shipfactory";
import Player from "./playerfactor";
import { gameState, changeGameState,  playerSetup } from "../gamecontroller";
import { players } from "../gameplay"

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
    this.turn = false;
    this.hit = false;
    this.lastShot = 101;
    
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
        });

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
      this.yAxis = this.yAxis === false ? true : false;
      return this.yAxis;
    
    }

    placeShip(location){
      const playerCode = "111";
      if(gameState === playerSetup){
      var locationArray = this.createLocationArray(location);
      
      if(this.checkForCollisions(locationArray)){
        locationArray.forEach(loc => this.dock[0].locationArr.push(loc));
        this.markShip(locationArray, playerCode);
        this.inPlay.push(this.dock[0]);
        this.dock.splice(0, 1);

        if (this.dock.length === 0){
          changeGameState();
          players[0].changeTurn()
          players[1].cpuAttack();
        }
        
      } else {
        return
      } 
      }
    }

    createLocationArray(location){
        var locationArray = [];
        var iLoc;
        for (let i = 0; i < this.dock[0].shipLength; i++) {

          if (this.yAxis === true){
            iLoc = location + i * this.size;
          } else {
            iLoc =  location + i
          }
          
          
        locationArray.push(iLoc);
        
    }

    return locationArray;
  }

   
    markShip(locationArray, playerCode){
     
      locationArray.forEach(loc => {
        this.tiles[loc].boatPresent = true;
        const div = document.getElementById(playerCode+loc);
        div.classList.add('ship');
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

    receiveAttack(player, location) {
      const playerCode = player.playerName === "Player 1" ? "000" : "999"
      const div = document.getElementById(playerCode+location);
      div.classList.add('fired');

      this.tiles[location].isShot = true;
      this.lastShot = location;
      this.inPlay.forEach(ship => ship.checkHit(location));
        if(this.inPlay.some(e => e.didHit === true)){
          this.hit = true;
          div.classList.add('hit');
          if (this.inPlay.some(ship => ship.sunk === true)) {
            console.log('sunk')
            const i = this.inPlay.findIndex(ship => ship.sunk);
            this.handleSunkShip(this.inPlay[i]); 
            this.inPlay.splice(i,1);
            players[0].board.checkForGameOver();          
            players[1].board.checkForGameOver();
        }
      } else {
        this.hit =  false;
        div.classList.add('miss');players[0].board
      }         
      players[0].changeTurn();
      players[1].changeTurn();

  }

    handleSunkShip(ship) {
      this.graveyard.push(ship);      
  }
    
    checkForGameOver() {
      console.log('start game over test')
      this.gameOver = (this.graveyard.length === 5) ? true : false;
      if(this.gameOver){
        console.log('game over')
        const endScreen = document.getElementById('game-over').style.visibility = "visible"

      }
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
      let axisTest = this.getRandomNumber(0,2);
      this.yAxis = axisTest === 0 ? true : false;
      var locationArray = this.createLocationArray(random);

      if(this.checkForCollisions(locationArray)){
        locationArray.forEach(loc => this.dock[0].locationArr.push(loc));
        this.inPlay.push(this.dock[0]);
        this.dock.splice(0, 1);
        
      } else {
        this.setupCpuShips();
      }
      
      }
      changeGameState();

      }

  

}

export default GameBoard;

