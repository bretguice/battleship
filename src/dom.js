import Player from "./factories/playerfactor";
export const playerOneBoard = document.getElementById('player1');
export const playerTwoBoard = document.getElementById('player2');

export function createGrid(player, playerboard){

    const playerCode = player.playerName === "Player 1" ? "000" : "999";

    for(let i = 0; i < player.board.boardSize; i++){
        let cell = document.createElement('div');
        cell.className = "gameboard";
        cell.id = playerCode + i;
        cell.setAttribute('data-id', i);
        const clickLocation = parseInt(cell.getAttribute('data-id'));
        cell.addEventListener('click', player.board.placeShip.bind(player.board, clickLocation));
   
        // cell.addEventListener('click', player.fireShot);
        playerboard.appendChild(cell)
    }
}
