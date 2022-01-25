function GameBoard(size) {
  return {
    size: size,
    firedShots: [],
    board: [],
    gameOver: false,
    boatLocations: [],

    setupBoard() {
      for (let i = 0; i < this.size; i++) {
        this.board.push({
          location: i,
          isShot: false,
          boatPresent: false,
        });
      }
    },
    receiveAttack(location) {
      this.board.isShot = this.firedShots.includes(location) ? false : true;
      if (this.board.isShot) this.firedShots.push(location);
    },
    checkForHit(i) {
      return this.board[i].boatPresent ? true : false;
    },
    markShipPlacement() {
      for (let i = 0; i < this.size; i++) {
        if (this.board[i].boatPresent) this.board.boatLocations.push(i);
      }
    },
    checkForGameOver() {
      return (this.gameOver = this.boatLocations.every(x =>
        this.firedShots.includes(x)
      ));
    },
  };
}

export default GameBoard;
