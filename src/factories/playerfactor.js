import GameBoard from './gameboard';
import Ship from './shipfactory';

function Player(player, boardSize) {
  return {
    player,
    cpu: false,
    turn: false,
    dock: [],
    inPlay:[],
    board: GameBoard(boardSize),
    checkForCpuPlayer() {
      // Check to see if player is CPU.  If so then change CPU property
      this.cpu = player === null;
      return this.cpu;
    },
    changeTurn() {
      // If turn property is false, change to true. Else if turn property is true, change to false
      (this.turn = this.turn === false ? true : this.turn !== true);
      return this.turn;
    },
    makeShip(){
      const carrier = Ship(0);
      const battleShip = Ship(1);
      const submarine =  Ship(2);
      const destroyer = Ship(3);
      const patrolBoat = Ship(4);
      this.dock.push(carrier, battleShip, submarine, destroyer, patrolBoat);
      return this.dock;
    
    },
    inputLocation(input){
      const location = input;
      return location;
    },

    placeShip(location){
      this.dock[0].shipLocation = location;
      this.inPlay.push(this.dock[0]);
      this.dock.shift()
    
    },

    fireShot(location) {
      this.board.firedShots.push(location);
      this.board.hitMessage = (this.board.checkForHit(location)) ? 'Hit!' : 'Miss!';
    },
  };
}

export default Player;
