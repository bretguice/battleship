import { createGrid, playerOneBoard, playerTwoBoard } from "./dom";
import Player from "./factories/playerfactor"
import { gameState } from "./gamecontroller";

var player = new Player('Player 1', "player");
var player2 = new Player('Player 2', "cpu");

player.board.setupBoard();
player2.board.setupBoard();
player.board.createShips();
player2.board.createShips();

createGrid(player, playerOneBoard);
// createGrid(player2, playerTwoBoard); 






