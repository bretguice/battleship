import Ship from '../src/factories/shipfactory';


it('test if ship is sunk', () => {
    const ship = Ship(4);
    ship.locationArr = [0,1]
    ship.hit(0)
    ship.hit(1)
  expect(ship.hitLocation.length).toBe(ship.shipLength);
});
