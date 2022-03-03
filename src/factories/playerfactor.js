import GameBoard from './gameboard';

class Player {
  constructor(playerName, type) {
    this.playerName = playerName;
    this.type = type;
    this.turn = false;
    this.board = new GameBoard(10);
  }

    changeTurn() {
      // If turn property is false, change to true. Else if turn property is true, change to false
      (this.turn = this.turn === false ? true : this.turn !== true);
      return this.turn;
    }

    fireShot(location, gameboard) {
      console.log('fired shot' + location)
      if(!gameboard.firedShots.includes(location)){
        gameboard.firedShots.push(location);
        gameboard.receiveAttack(location);
      } else {
        // game controller to go back to attack phaze
        return false
      }
    }

}

export default Player;
