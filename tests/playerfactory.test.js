import Player from "../src/factories/playerfactor";
import Ship from "../src/factories/shipfactory";

describe('Tests for Player Factory', ()=> {
    let player; 
    let cpu;
    beforeEach(() =>{ 
        player = new Player("Test", player);
        cpu = new Player("CPU", cpu);
        cpu.board.setupBoard();
        
        
    });
    it ('fire a shot', () =>{
        const carrier = new Ship(0);
        cpu.board.placeShip(0, carrier);
        player.fireShot(0, cpu.board);

        expect(cpu.board.firedShots).toStrictEqual([0])

    })

    it ('check ship hit location', ()=> {
        const carrier = new Ship(0);
        cpu.board.placeShip(0, carrier);
        player.fireShot(0, cpu.board);

        expect(carrier.hitLocation).toEqual([0]);
    })

    it ('check player hit message hit!', ()=> {
        const carrier = new Ship(0);
        cpu.board.placeShip(0, carrier);
        player.fireShot(0, cpu.board);

        expect(cpu.board.hitMessage).toBe("Hit!");
    })
    
    it ('check player hit message miss!', ()=> {
        const carrier = new Ship(0);
        cpu.board.placeShip(0, carrier);
        player.fireShot(1, cpu.board);

        expect(cpu.board.hitMessage).toBe("Miss!");
    })

    it ('check player sunk message', ()=> {
        const carrier = new Ship(0);
        cpu.board.placeShip(0, carrier);
        player.fireShot(0, cpu.board);
        player.fireShot(10, cpu.board);
        player.fireShot(20, cpu.board);
        player.fireShot(30, cpu.board);
        player.fireShot(40, cpu.board);

        expect(cpu.board.sunkMessage).toEqual("Carrier is sunk");
    })

})