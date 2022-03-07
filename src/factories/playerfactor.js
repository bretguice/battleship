import { gameState, attack } from '../gamecontroller';
import GameBoard from './gameboard';
import { players } from '../gameplay'

class Player {
  constructor(playerName, type) {
    this.playerName = playerName;
    this.type = type;
    this.turn = false;
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

  cpuAttack(){
      const player = players[0];
      if (gameState === attack && players[1].turn === true){
        if(this.board.hit === true){
          
        }

        const location = this.board.getRandomNumber(0, 100)
        if(!player.board.firedShots.includes(location)){
          player.board.firedShots.push(location);
          player.board.receiveAttack(player, location);
        } else {
          this.cpuAttack(player);
      }
    }
    

  }

}

export default Player;
