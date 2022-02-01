import Player from "./factories/playerfactor"

function setupGame(player1, player2, size){
    // create players
    const player = Player(player1, size);
    const cpu = Player(player2, size);
    // assign cpu status
    player.checkForCpuPlayer();
    cpu.checkForCpuPlayer();
    // create game board for each player
    player.board.setupBoard();
    cpu.board.setupBoard();
    // create ships that are added to the dock
    player.makeShip();
    cpu.makeShip();
}

export default setupGame;