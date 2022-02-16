import Ship from '../src/factories/shipfactory';

describe ('ship factory testing', () => {
  const ship = Ship(4);
  beforeEach(() =>{ 
    
    ship.locationArr = [0,1];
    ship.hitLocation = [];
  });

  it('test if ship is sunk', () => {
      ship.checkHit(0)
      ship.checkHit(1)
    expect(ship.hitLocation.length).toBe(ship.shipLength);
  });

  it ('test sunk property', () => {
      ship.checkHit(0);
      ship.checkHit(1);
      ship.isSunk();

    expect(ship.sunk).toBe(true);
  })

})