export const gameStateArr = ['player setup', 'cpu setup', 'player attack', 'player result', 'cpu attack', 'cpu result'];
export const [playerSetup, cpuSetup, playerAttack, playerResult, cpuAttack, cpuResult] = gameStateArr;
// eslint-disable-next-line import/no-mutable-exports
export let gameState = playerSetup;

export function changeGameState(){

    if(gameState === playerSetup){
        gameState = cpuSetup;         
    } else if (gameState === cpuSetup) {
        gameState = playerAttack;
    } else if (gameState === playerAttack) {
        gameState = playerResult;
    } else if (gameState === playerResult) {
        gameState = cpuAttack;
    } else if (gameState === cpuAttack) {
        gameState = cpuResult;
    } else if (gameState === cpuResult) {
        gameState = playerAttack;
    }
}
    

