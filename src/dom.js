import { players } from "../src/gameplay"
import Player from "./factories/playerfactor";
export const playerOneBoard = document.getElementById('player1');
export const playerTwoBoard = document.getElementById('player2');
export const rotateButton = document.getElementById('rotate');


export function createGrid(playerboard){

    
    const playerCode = players[0].playerName === "Player 1" ? "000" : "999";

    for(let i = 0; i < players[0].board.boardSize; i++){
        let cell = document.createElement('div');
        cell.className = "gameboard";
        cell.id = playerCode + i;
        cell.setAttribute('data-id', i);
        const clickLocation = parseInt(cell.getAttribute('data-id'));
        cell.addEventListener('click', players[0].board.placeShip.bind(players[0].board, clickLocation));
        playerboard.appendChild(cell)
    }
}

export function setOppoBoard(playerboard){
    const playerCode = players[1].playerName === "Player 1" ? "000" : "999";

    for(let i = 0; i < players[1].board.boardSize; i++){
        let cell = document.createElement('div');
        cell.className = "gameboard";
        cell.id = playerCode + i;
        cell.setAttribute('data-id', i);
        const clickLocation = parseInt(cell.getAttribute('data-id'));
        cell.addEventListener('click', players[1].fireShot.bind(players[1].board, clickLocation));

        playerboard.appendChild(cell)
    }

}
