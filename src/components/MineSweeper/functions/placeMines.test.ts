import placeMines from './placeMines';

describe('placeMines', () => {
  it('should place mines', () => {
    const minePlacements = placeMines({
      height: 10,
      width: 10,
      mines: 10,
    });
    expect(minePlacements.length).toBe(10);
  });

  it('should not place mines on the same position', () => {
    const minePlacements = placeMines({
      height: 10,
      width: 10,
      mines: 10,
    });

    // Here we use set to check if there are any duplicates
    const uniqueMinePlacements = new Set(minePlacements.map((el) => el.join()));
    expect(uniqueMinePlacements.size).toBe(10);
  });
});
