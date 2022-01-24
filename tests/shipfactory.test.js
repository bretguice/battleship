import createShip from '../src/factories/shipfactory';


it('test if ship is sunk', () => {
    const ship = createShip([0, 1]);
    ship.hit(0)
    ship.hit(1)
  expect(ship.hitLocation.length).toBe(ship.shipLength);
});
