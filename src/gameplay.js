import { createGrid, playerOneBoard, playerTwoBoard, setOppoBoard } from "./dom";
import Player from "./factories/playerfactor"
import { gameState } from "./gamecontroller";

var player = new Player('Player 1', "player");
var player2 = new Player('Player 2', "cpu");

player.board.setupBoard();
player2.board.setupBoard();
player.board.createShips();
player2.board.createShips();

createGrid(player, playerOneBoard);
setOppoBoard(player2, playerTwoBoard); 
player2.board.setupCpuShips();

/*
player2.board.dock[0].locationArr.push(0,1,2,3,4);
player2.board.dock[1].locationArr.push(10,11,12,13);
player2.board.dock[2].locationArr.push(20,21,22,);
player2.board.dock[3].locationArr.push(30,31,32);
player2.board.dock[4].locationArr.push(40,41);
player2.board.inPlay.push(player2.board.dock[0],player2.board.dock[1],player2.board.dock[2],player2.board.dock[3],player2.board.dock[4],);
*/





