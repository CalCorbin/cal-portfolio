import displayWinner from './displayWinner';

describe('displayWinner', () => {
  it('should return "no winner" if there is no winner', () => {
    expect(displayWinner(null, { X: 0, O: 0 })).toBe('no winner');
  });

  it('should return "IT\'S A DRAW!" if there is a draw', () => {
    expect(displayWinner('draw', { X: 0, O: 0 })).toBe("IT'S A DRAW!");
  });

  it('should return "X WINS!" if X is the winner', () => {
    expect(displayWinner('X', { X: 0, O: 0 })).toBe('X WINS!');
  });

  it('should return "X WINS AGAIN!" if X is the winner and has won before', () => {
    expect(displayWinner('X', { X: 2, O: 0 })).toBe('X WINS AGAIN!');
  });

  it('should return "O WINS!" if O is the winner', () => {
    expect(displayWinner('O', { X: 0, O: 1 })).toBe('O WINS!');
  });

  it('should return "O WINS AGAIN!" if O is the winner and has won before', () => {
    expect(displayWinner('O', { X: 0, O: 2 })).toBe('O WINS AGAIN!');
  });
});
