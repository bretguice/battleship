import { createGrid, playerOneBoard, playerTwoBoard, setupScreen, showPlayerBoard, setOppoBoard, rotateButton, setup, confirmShip } from "./dom";
import Player from "./factories/playerfactor"
import { changeGameState, cpuSetup, gameState, playerSetup } from "./gamecontroller";



var player = new Player('Player 1', "player");
var player2 = new Player('Player 2', "cpu");
export const players = [player, player2];
rotateButton.addEventListener('click', player.board.rotateShip.bind(player.board))
confirmShip.addEventListener('click', function(){
    setupScreen.style.visibility = "hidden";
    showPlayerBoard(playerOneBoard);
})
player.board.setupBoard();
player2.board.setupBoard();
player.board.createShips();
player2.board.createShips();
createGrid(setup)
// showPlayerBoard(playerOneBoard);
setOppoBoard(playerTwoBoard); 
player2.board.setupCpuShips();

console.log(gameState)






