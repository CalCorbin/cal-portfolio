import { Board } from '../types';

export default function getCpuTurn(board: Board) {
  const emptyIndexes: { arrayIndex: number; index: number }[] = [];
  board.forEach((row: string[], arrayIndex: number) => {
    row.forEach((cell: string, index: number) => {
      if (cell === '') {
        emptyIndexes.push({ arrayIndex, index });
      }
    });
  });
  const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
  return emptyIndexes[randomIndex];
}
