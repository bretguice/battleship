import Player from "../src/factories/playerfactor";

describe('Tests for Player Factory', ()=> {
    const player = Player('player 1');
    beforeEach(() =>{ 
        player.board.setupBoard(100)
    });
    it ('fire a shot', () =>{

    })
    it ('try to fire a shot to a location twice', () =>{

    })
    it ('Check if player is player', ()=>{
        expect(player.checkForCpuPlayer()).toBe(false);
    })
    it ('Check if player is cpu', ()=>{
        const cpu = Player(null);
        expect(cpu.checkForCpuPlayer()).toBe(true);
    })

    it ('Test length of dock after ship creation', ()=>{
        player.makeShip();
        expect(player.dock.length).toBe(5);
    })

    it ('Test name of first item in dock', ()=>{
        player.makeShip();
        expect(player.dock[0].type).toBe("Carrier");
    })

    it ('Test name of first item in dock after placing ship', ()=>{
        player.makeShip();
        player.placeShip(1);
        expect(player.dock[0].type).toBe("Battleship");
    })
    it ('Test name of first item in play after placing ship', ()=>{
        player.makeShip();
        player.placeShip(1);
        expect(player.inPlay[0].type).toBe("Carrier");
    })
// This is way too complicated.  Let's find a way to make ship location simple
/*
    it ('Test name of first item in dock after placing ship', ()=>{
        player.makeShip();
        player.inputLocation(1);
        player.placeShip(player.inputLocation);
        player.board.createLocationArray(player.inputLocation , player.inPlay[0])
        expect(player.inPlay[0].locationArr).toBe([1, 11]);
    })

*/

})