import GameBoard from "../src/factories/gameboard";
import Ship from "../src/factories/shipfactory";

describe ('test functions', () => {
    let gameboard;     
    beforeEach(() =>{ 
        gameboard = new GameBoard(10);
        gameboard.setupBoard();
        
    });

    it ('check axis', () => {
        gameboard.rotateShip();
        expect(gameboard.axis).toBe('x');
    })

    it ('check location array x Axis', () =>{
        let carrier = new Ship(0);    
        gameboard.rotateShip();        
        expect(gameboard.placeShip(0, carrier)).toStrictEqual([0, 1, 2, 3, 4]);
    })
   
    it ('check location array y Axis', () =>{
        let carrier = new Ship(0);    
       
        expect(gameboard.placeShip(0, carrier)).toStrictEqual([0, 10, 20, 30, 40]);
    })

    it ('check boat present flag', () =>{
        let carrier = new Ship(0);   
        gameboard.markShip(gameboard.placeShip(0, carrier));
       
        expect(gameboard.board[10].boatPresent).toBe(true);
    })

    it ('check fail boat placement on another boat', () =>{
        let carrier = new Ship(0); 
        let battleShip = new Ship(1);  
        gameboard.markShip(gameboard.placeShip(0, carrier));
       
        expect(gameboard.checkForCollisions(gameboard.placeShip(10, battleShip))).toBe(false);
    })

    it ('check receive attack isShot flag', () => {
        let carrier = new Ship(0);
        gameboard.inPlay.push(carrier);
        gameboard.receiveAttack(0)

        expect(gameboard.board[0].isShot).toBe(true);
    })

    it ('check attack with multiple ships', () => {
        gameboard.createShips()
        
        gameboard.placeShip(0, gameboard.dock[0]);
        gameboard.placeShip(8, gameboard.dock[1]);
        gameboard.receiveAttack(0);
        gameboard.receiveAttack(10);
        gameboard.receiveAttack(20);


        expect(gameboard.inPlay[0].hitLocation.length).toBe(3);
    })

    it ('check for sunk ship', () =>{
        let carrier = new Ship(0);
        gameboard.inPlay.push(carrier);
        let battleShip = new Ship(1);
        gameboard.inPlay.push(battleShip);
        gameboard.placeShip(0, carrier);
        gameboard.placeShip(8, battleShip);
        gameboard.receiveAttack(0);
        gameboard.receiveAttack(10);
        gameboard.receiveAttack(20);
        gameboard.receiveAttack(30);
        gameboard.receiveAttack(40);

        expect(carrier.sunk).toBe(true);
    
    })

    it ('check for sunk ship', () =>{
        gameboard.createShips()
        gameboard.placeShip(0, gameboard.dock[0]);
        gameboard.placeShip(8, gameboard.dock[1]);
        gameboard.receiveAttack(0);
        gameboard.receiveAttack(10);
        gameboard.receiveAttack(20);
        gameboard.receiveAttack(30);
        gameboard.receiveAttack(40);

        expect(gameboard.graveyard[0].shipType).toEqual('Carrier');
    
    })

    it ('check for game over', () =>{
        gameboard.createShips()
        gameboard.placeShip(0, gameboard.dock[0]);
        gameboard.placeShip(8, gameboard.dock[1]);
        gameboard.receiveAttack(0);
        gameboard.receiveAttack(10);
        gameboard.receiveAttack(20);
        gameboard.receiveAttack(30);
        gameboard.receiveAttack(40);
        gameboard.receiveAttack(8);
        gameboard.receiveAttack(18);
        gameboard.receiveAttack(28);
        gameboard.receiveAttack(38);

        expect(gameboard.gameOver).toBe(true);
    })

    it ('check location array is valid y axis', () =>{
        let carrier = new Ship(0);    
        
        expect(gameboard.checkForCollisions(gameboard.placeShip(70, carrier))).toBe(false);
    })

    it ('check location array is valid x axis', () =>{
        let carrier = new Ship(0);    
        gameboard.rotateShip();
        expect(gameboard.checkForCollisions(gameboard.placeShip(9, carrier))).toBe(false);
    })

}) 

