import { gameState, attack } from '../gamecontroller';
import GameBoard from './gameboard';
import { players } from '../gameplay'

class Player {
  constructor(playerName, type) {
    this.playerName = playerName;
    this.type = type;
    this.turn = false;
    this.lastShot = 101;
    this.board = new GameBoard(10);
  }


    changeTurn() {
      this.turn = this.turn === false ? true : false;
    }

    fireShot(location) {
      const player = players[1];
      if (gameState === attack && players[0].turn === true){
        if(!player.board.firedShots.includes(location)){
          player.board.firedShots.push(location);
          player.board.receiveAttack(player, location);
          players[1].cpuAttack();
      
        } else {
          return false
        }
    }
  }

/*  Still working on CPU attack Logic
  createTargetArray(){
    let targetArray = [];
    const target = players[0].board.lastShot;
    
    return targetArray
    }

  checkTargetArray(targetArr){
    targetArr.forEach(loc => {
      if (players[0].board.tiles[loc].isShot === true || !players[0].board.tiles[loc]) {
        targetArr.splice(targetArr.indexOf(loc), 1)
        return targetArr;
      }
    })
  }

 
  cpuFireTargetShot(targetArray, player){
    const location = targetArray[Math.floor(Math.random()*targetArray.length)];
    player.board.firedShots.push(location);
    player.board.receiveAttack(player, location);

  }

*/
  cpuAttack(){
    const player = players[0];

    if (gameState === attack && players[1].turn === true){
     
      this.cpuFireShot(player);
      
    }
    

  }

  cpuFireShot(player){
    const location = this.board.getRandomNumber(0, 100)
    if(!player.board.firedShots.includes(location)){
      player.board.firedShots.push(location);
      player.board.receiveAttack(player, location);
    } else {
      this.cpuAttack(player);
    }
  }

}

export default Player;
