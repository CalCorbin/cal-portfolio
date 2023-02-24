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

  it('should not place mines on the first click position', () => {
    const minePlacements = placeMines({
      height: 10,
      width: 10,
      mines: 10,
      firstMine: [1, 2],
    });

    const uniqueMinePlacements = new Set(minePlacements.map((el) => el.join()));
    expect(uniqueMinePlacements.size).toBe(10);
    expect(minePlacements).not.toContainEqual([1, 2]);
  });

  it('should place mines on the first click position if there are no other options', () => {
    const minePlacements = placeMines({
      height: 1,
      width: 1,
      mines: 1,
      firstMine: [0, 0],
    });

    const uniqueMinePlacements = new Set(minePlacements.map((el) => el.join()));
    expect(uniqueMinePlacements.size).toBe(1);
    expect(minePlacements).toContainEqual([0, 0]);
  });
});
