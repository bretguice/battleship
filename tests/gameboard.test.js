import GameBoard from "../src/factories/gameboard";

describe ('test functions', () => {
    const gameBoard = GameBoard(100);
    beforeEach(() =>{ 
        gameBoard.setupBoard()
    });

    it ('check for hit', () =>{
        
        gameBoard.board[2].boatPresent = true;
        expect(gameBoard.checkForHit(2)).toBe(true);
    })
    it ('check for game over', () =>{
        gameBoard.boatLocations = [1, 2, 3];
        gameBoard.firedShots = [0, 1, 2, 3, 4, 5, 6, 7];
        expect(gameBoard.checkForGameOver()).toBe(true);

    })
    it ('check for game not over', () =>{
        gameBoard.boatLocations = [1, 2, 3];
        gameBoard.firedShots = [0, 2, 3, 4, 5, 6, 7];
        expect(gameBoard.checkForGameOver()).toBe(false);

    })

    it ('check for game not over', () =>{
        gameBoard.boatLocations = [1, 2, 3];
        gameBoard.firedShots = [2];
        expect(gameBoard.checkForGameOver()).toBe(false);

    })
/*
    it ('check for collisions y axis false', () =>{
        const locationArr = [10,11];

        expect(gameBoard.checkForCollisions(locationArr)).toBe(false);
    })

    it ('check for collisions y axis true', () =>{
        const locationArr = [9,10];

        expect(gameBoard.checkForCollisions(locationArr)).toBe(true);
    })

    it ('check for collisions x axis false', () =>{
        const locationArr = [1,91];

        expect(gameBoard.checkForCollisions(locationArr)).toBe(false);
    })

    it ('check for collisions x axis true', () =>{
        const locationArr = [1,11];

        expect(gameBoard.checkForCollisions(locationArr)).toBe(true);
    })*/
})