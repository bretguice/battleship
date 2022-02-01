/* eslint-disable no-unneeded-ternary */


function GameBoard(size) {
  return {
    boardSize: size * size,
    firedShots: [],
    board: [],
    gameOver: false,
    boatLocations: [],
    yAxis: true,
    ships: [],
    hitMessage: "",

    setupBoard() {
      for (let i = 0; i < this.boardSize; i ++) {
        this.board.push({
          location: i,
          isShot: false,
          boatPresent: false,
        });
      }
    },

    receiveAttack(location) {
      this.board.isShot = !this.firedShots.includes(location);
      if (this.board.isShot) this.firedShots.push(location);
    },
    createLocationArray(location, ship){
      const locationArray = []
        for (let i = 0; i < ship.length; i++) {
          if (this.yAxis){ 
            locationArray.push(i + location * 10) }
          else  {locationArray.push(i + location)};
        }
      return locationArray;

    },

    checkForCollisions(locationArray) {
      // Check to make sure ship placement is legal
      // Does not go at the location of another ship
      // Does not cross over the boundary
      const xAxisBumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
      const yAxisBumber = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
      let collision;

      if (this.yAxis){
        collision = (locationArray.some(e => yAxisBumber.includes(e))) ? false : true;
      } 
      else {
        collision = (locationArray.some(e => xAxisBumber.includes(e))) ? false : true; 
      }

      return collision;
    },

    rotateShip() {
      // Default axis is y axis.  If default change axis to x.
      if (this.yAxis === false){
        this.yAxis = true;
      } else if (this.board.yAxis === true){
        this.yAxis = false;
      }
      return this.yAxis;
    },
    checkForHit(i) {
      return this.board[i].boatPresent;
    },
    markShipPlacement() {
      for (let i = 0; i < this.size; i++) {
        if (this.board[i].boatPresent) this.board.boatLocations.push(i);
      }
    },
    checkForGameOver() {
      (this.gameOver = this.boatLocations.every((i) => this.firedShots.includes(i)));
      return this.gameOver;
    },
  };
}

export default GameBoard;
