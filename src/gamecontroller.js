import { players } from "../src/gameplay"

export const gameStateArr = [ 'cpu setup','player setup', 'attack'];
export const [cpuSetup, playerSetup, attack] = gameStateArr;
export let gameState = cpuSetup;

export function changeGameState(){
    if(gameState === cpuSetup){
        gameState = playerSetup;         
    } else if (gameState === playerSetup && players[0].board.dock.length === 0 && players[1].board.dock.length === 0 ) {
        gameState = attack;
    } 
}
    

