import { CheckForWinnerTypes, Players } from '../types';

export default function useCheckForWinner({
  setWinner,
  setWinningCells,
  setRecord,
  board,
  players,
  record,
}: CheckForWinnerTypes) {
  const entries = Object.entries(players);

  // Check rows for a winning play.
  for (let index = 0; index < board.length; index += 1) {
    const row = board[index];
    for (let i = 0; i < entries.length; i += 1) {
      const [key, value] = entries[i];
      if (row.every((cell) => cell === value)) {
        setWinner(key as Players[keyof Players]);
        setWinningCells([
          [index, 0],
          [index, 1],
          [index, 2],
        ]);
        setRecord({
          ...record,
          [value]: record[value] + 1,
        });
        return { winner: key, winType: 'row' };
      }
    }
  }

  // Check columns for a winning play.
  for (let index = 0; index < board.length; index += 1) {
    const column = board.map((row) => row[index]);
    for (let i = 0; i < entries.length; i += 1) {
      const [key, value] = entries[i];
      if (column.every((cell) => cell === value)) {
        setWinner(key as Players[keyof Players]);
        setWinningCells([
          [0, index],
          [1, index],
          [2, index],
        ]);
        setRecord({
          ...record,
          [value]: record[value] + 1,
        });
        return { winner: key, winType: 'column' };
      }
    }
  }

  // Check diagonally for a winning play.
  const diagonal = [board[0][0], board[1][1], board[2][2]];
  const antiDiagonal = [board[0][2], board[1][1], board[2][0]];
  for (let i = 0; i < entries.length; i += 1) {
    const [key, value] = entries[i];
    if (diagonal.every((cell) => cell === value)) {
      setWinner(key as Players[keyof Players]);
      setWinningCells([
        [0, 0],
        [1, 1],
        [2, 2],
      ]);
      setRecord({
        ...record,
        [value]: record[value] + 1,
      });
      return { winner: key, winType: 'diagonal' };
    }
    if (antiDiagonal.every((cell) => cell === value)) {
      setWinner(key as Players[keyof Players]);
      setWinningCells([
        [0, 2],
        [1, 1],
        [2, 0],
      ]);
      setRecord({
        ...record,
        [value]: record[value] + 1,
      });
      return { winner: key, winType: 'antiDiagonal' };
    }
  }

  // Check for draw.
  if (board.flat().every((cell) => cell !== '')) {
    setWinner('draw');
    return { winner: 'draw', winType: 'draw' };
  }

  // Assume no winner on this turn.
  setWinner(null);
  return { winner: null, winType: null };
}
