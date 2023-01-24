import useCheckForWinner from './useCheckForWinner';
import { GameRecord, Players } from '../types';

describe('checkForWinner', () => {
  type argsTypes = {
    board: string[][];
    record: GameRecord;
    players: Players;
    winningCells: number[][];
  };

  const gameArgs = (args: argsTypes) => ({
    ...args,
    setWinner: jest.fn(),
    setWinningCells: jest.fn(),
    setRecord: jest.fn(),
  });

  it('should return CPU with a winning row', () => {
    const board = [
      ['O', 'O', 'O'],
      ['X', 'X', ''],
      ['', '', ''],
    ];
    const game = useCheckForWinner(
      gameArgs({
        board,
        record: { X: 0, O: 0 },
        players: { HUMAN: 'X', CPU: 'O' },
        winningCells: [
          [0, 0],
          [0, 1],
          [0, 2],
        ],
      })
    );
    expect(game).toEqual({ winner: 'CPU', winType: 'row' });
  });

  it('should return HUMAN with a winning row', () => {
    const board = [
      ['X', 'X', 'X'],
      ['O', 'O', ''],
      ['', '', ''],
    ];
    const game = useCheckForWinner(
      gameArgs({
        board,
        players: { HUMAN: 'X', CPU: 'O' },
        record: { X: 0, O: 0 },
        winningCells: [
          [0, 0],
          [0, 1],
          [0, 2],
        ],
      })
    );
    expect(game).toEqual({ winner: 'HUMAN', winType: 'row' });
  });

  it('should return CPU with a winning column', () => {
    const board = [
      ['O', 'X', ''],
      ['O', 'X', ''],
      ['O', '', ''],
    ];
    const game = useCheckForWinner(
      gameArgs({
        board,
        players: { HUMAN: 'X', CPU: 'O' },
        record: { X: 0, O: 0 },
        winningCells: [
          [0, 0],
          [1, 0],
          [2, 0],
        ],
      })
    );
    expect(game).toEqual({ winner: 'CPU', winType: 'column' });
  });

  it('should return HUMAN with a winning column', () => {
    const board = [
      ['X', 'O', ''],
      ['X', 'O', ''],
      ['X', '', ''],
    ];
    const game = useCheckForWinner(
      gameArgs({
        board,
        players: { HUMAN: 'X', CPU: 'O' },
        record: { X: 0, O: 0 },
        winningCells: [
          [0, 0],
          [1, 0],
          [2, 0],
        ],
      })
    );
    expect(game).toEqual({ winner: 'HUMAN', winType: 'column' });
  });

  it('should return CPU with a winning diagonal', () => {
    const board = [
      ['O', 'X', ''],
      ['X', 'O', ''],
      ['', '', 'O'],
    ];
    const game = useCheckForWinner(
      gameArgs({
        board,
        players: { HUMAN: 'X', CPU: 'O' },
        record: { X: 0, O: 0 },
        winningCells: [
          [0, 0],
          [1, 1],
          [2, 2],
        ],
      })
    );
    expect(game).toEqual({ winner: 'CPU', winType: 'diagonal' });
  });

  it('should return HUMAN with a winning diagonal', () => {
    const board = [
      ['X', 'O', ''],
      ['O', 'X', ''],
      ['', '', 'X'],
    ];
    const game = useCheckForWinner(
      gameArgs({
        board,
        players: { HUMAN: 'X', CPU: 'O' },
        record: { X: 0, O: 0 },
        winningCells: [
          [0, 0],
          [1, 1],
          [2, 2],
        ],
      })
    );
    expect(game).toEqual({ winner: 'HUMAN', winType: 'diagonal' });
  });

  it('should return CPU with a winning anti-diagonal', () => {
    const board = [
      ['', 'X', 'O'],
      ['X', 'O', ''],
      ['O', '', ''],
    ];
    const game = useCheckForWinner(
      gameArgs({
        board,
        players: { HUMAN: 'X', CPU: 'O' },
        record: { X: 0, O: 0 },
        winningCells: [
          [0, 2],
          [1, 1],
          [2, 0],
        ],
      })
    );
    expect(game).toEqual({ winner: 'CPU', winType: 'antiDiagonal' });
  });

  it('should return HUMAN with a winning anti-diagonal', () => {
    const board = [
      ['', 'O', 'X'],
      ['O', 'X', ''],
      ['X', '', ''],
    ];
    const game = useCheckForWinner(
      gameArgs({
        board,
        players: { HUMAN: 'X', CPU: 'O' },
        record: { X: 0, O: 0 },
        winningCells: [
          [0, 2],
          [1, 1],
          [2, 0],
        ],
      })
    );
    expect(game).toEqual({ winner: 'HUMAN', winType: 'antiDiagonal' });
  });

  it('should return DRAW', () => {
    const board = [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['O', 'X', 'O'],
    ];
    const game = useCheckForWinner(
      gameArgs({
        board,
        players: { HUMAN: 'X', CPU: 'O' },
        record: { X: 0, O: 0 },
        winningCells: [
          [0, 0],
          [0, 1],
          [0, 2],
        ],
      })
    );
    expect(game).toEqual({ winner: 'draw', winType: 'draw' });
  });

  it('should return null if no winner', () => {
    const board = [
      ['X', 'O', ''],
      ['O', 'X', ''],
      ['O', 'X', ''],
    ];
    const game = useCheckForWinner(
      gameArgs({
        board,
        players: { HUMAN: 'X', CPU: 'O' },
        record: { X: 0, O: 0 },
        winningCells: [
          [0, 0],
          [0, 1],
          [0, 2],
        ],
      })
    );
    expect(game).toEqual({ winner: null, winType: null });
  });
});
