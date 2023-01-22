import { Dispatch, SetStateAction } from 'react';
import { GameRecord, PlayerOption, Players } from '../types';

type CheckForWinnerTypes = {
  setWinner: Dispatch<SetStateAction<PlayerOption | 'draw'>>;
  setWinningCells: Dispatch<SetStateAction<number[][]>>;
  setRecord: Dispatch<SetStateAction<GameRecord>>;
  board: string[][]; // 3x3 array of 'X', 'O', or ''
  record: GameRecord;
  players: Players;
  winningCells: number[][];
};

export default function checkForWinner({
  setWinner,
  setWinningCells,
  setRecord,
  board,
  players,
  record,
}: CheckForWinnerTypes) {
  // Check rows for a winning play.
  for (let index = 0; index < board.length; index += 1) {
    const row = board[index];
    if (row.every((cell) => cell === players?.CPU)) {
      setWinner(players?.CPU);
      setWinningCells([
        [index, 0],
        [index, 1],
        [index, 2],
      ]);
      setRecord({
        ...record,
        [players?.CPU]: record[players?.CPU] + 1,
      });
      return;
    }
    if (row.every((cell) => cell === players?.HUMAN)) {
      setWinner(players?.HUMAN);
      setWinningCells([
        [index, 0],
        [index, 1],
        [index, 2],
      ]);
      setRecord({
        ...record,
        [players?.HUMAN]: record[players?.HUMAN] + 1,
      });
      return;
    }
  }

  // Check columns for a winning play.
  for (let i = 0; i < 3; i += 1) {
    const column = board.map((row) => row[i]);
    if (column.every((cell) => cell === players?.CPU)) {
      setWinner(players?.CPU);
      setWinningCells([
        [0, i],
        [1, i],
        [2, i],
      ]);
      setRecord({
        ...record,
        [players?.CPU]: record[players?.CPU === 'X' ? 'X' : 'O'] + 1,
      });
      return;
    }
    if (column.every((cell) => cell === players?.HUMAN)) {
      setWinner(players?.HUMAN);
      setWinningCells([
        [0, i],
        [1, i],
        [2, i],
      ]);
      setRecord({
        ...record,
        [players?.HUMAN]: record[players?.HUMAN === 'X' ? 'X' : 'O'] + 1,
      });
      return;
    }
  }

  // Check diagonally for a winning play.
  const diagonal1 = [board[0][0], board[1][1], board[2][2]];
  const diagonal2 = [board[0][2], board[1][1], board[2][0]];
  if (diagonal1.every((cell) => cell === players?.CPU)) {
    setWinner(players?.CPU);
    setWinningCells([
      [0, 0],
      [1, 1],
      [2, 2],
    ]);
    setRecord({
      ...record,
      [players?.CPU]: record[players?.CPU === 'X' ? 'X' : 'O'] + 1,
    });
  } else if (diagonal1.every((cell) => cell === players?.HUMAN)) {
    setWinner(players?.HUMAN);
    setWinningCells([
      [0, 0],
      [1, 1],
      [2, 2],
    ]);
    setRecord({
      ...record,
      [players?.HUMAN]: record[players?.HUMAN === 'X' ? 'X' : 'O'] + 1,
    });
  } else if (diagonal2.every((cell) => cell === players?.CPU)) {
    setWinner(players?.CPU);
    setWinningCells([
      [0, 2],
      [1, 1],
      [2, 0],
    ]);
    setRecord({
      ...record,
      [players?.CPU]: record[players?.CPU === 'X' ? 'X' : 'O'] + 1,
    });
  } else if (diagonal2.every((cell) => cell === players?.HUMAN)) {
    setWinner(players?.HUMAN);
    setWinningCells([
      [0, 2],
      [1, 1],
      [2, 0],
    ]);
    setRecord({
      ...record,
      [players?.HUMAN]: record[players?.HUMAN === 'X' ? 'X' : 'O'] + 1,
    });
  } else if (board.flat().every((cell) => cell !== '')) {
    setWinner('draw');
  } else {
    setWinner('');
  }
}
