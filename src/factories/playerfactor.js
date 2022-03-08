import { gameState, attack } from '../gamecontroller';
import GameBoard from './gameboard';
import { players } from '../gameplay'

class Player {
  constructor(playerName, type) {
    this.playerName = playerName;
    this.type = type;
    this.turn = false;
    this.lastAttack = 101;
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

  createTargetArray(){
    const targetArray = [];
    players[0].board.lastShot = target;
    targetArray.push(target -10);
    targetArray.push(target -1);
    targetArray.push(target + 1);
    targetArray.push(target + 10);
    console.log(targetArray);
    return targetArray
    }

  checkTargetArray(targetArr){
    if (targetArr.length > 0){
      
    }
  }

  cpuFireShot(player){
    console.log(player.board.lastShot)
    const location = this.board.getRandomNumber(0, 100)
    if(!player.board.firedShots.includes(location)){
      player.board.firedShots.push(location);
      player.board.receiveAttack(player, location);
    } else {
      this.cpuAttack(player);
    }
  }
  cpuFireTargetShot(){

  }
  cpuAttack(){
    console.log()
      const player = players[0];

      if (gameState === attack && players[1].turn === true){
        if(player.board.hit === true){
          const targetArray = this.createTargetArray(player)
          this.checkTargetArray(targetArray);
          this.cpuFireShot(player);

        }
        this.cpuFireShot(player);

      }
    

  }

}

export default Player;
