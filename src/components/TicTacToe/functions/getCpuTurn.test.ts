import getCpuTurn from './getCpuTurn';

describe('getCpuTurn', () => {
  it('should return a cell on the first row in the first column', () => {
    const board = [
      ['', 'O', 'X'],
      ['O', 'X', 'X'],
      ['O', 'X', 'O'],
    ];
    const turn = getCpuTurn(board);
    expect(turn).toEqual({ arrayIndex: 0, index: 0 });
  });

  it('should return a cell on the second row in the third column', () => {
    const board = [
      ['X', 'O', 'X'],
      ['O', 'X', ''],
      ['O', 'X', 'O'],
    ];
    const turn = getCpuTurn(board);
    expect(turn).toEqual({ arrayIndex: 1, index: 2 });
  });

  it('should return a cell on the third row in the second column', () => {
    const board = [
      ['X', 'O', 'X'],
      ['O', 'X', 'X'],
      ['O', '', 'O'],
    ];
    const turn = getCpuTurn(board);
    expect(turn).toEqual({ arrayIndex: 2, index: 1 });
  });

  it('should return a cell with no plays in it', () => {
    const board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', 'O'],
    ];
    const { arrayIndex, index } = getCpuTurn(board);
    expect(board[arrayIndex][index]).toEqual('');
  });

  it('should return a cell with no plays in it', () => {
    const board = [
      ['O', '', ''],
      ['', 'X', ''],
      ['', '', 'O'],
    ];
    const { arrayIndex, index } = getCpuTurn(board);
    expect(board[arrayIndex][index]).toEqual('');
  });
});
