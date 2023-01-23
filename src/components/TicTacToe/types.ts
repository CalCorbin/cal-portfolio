import { Dispatch, SetStateAction } from 'react';

export type PlayerOption = 'X' | 'O';
export type GameRecord = Record<PlayerOption, number>;
export type Players = Record<'CPU' | 'HUMAN', PlayerOption>;
export type CheckForWinnerTypes = {
  setWinner: Dispatch<SetStateAction<PlayerOption | 'draw' | null>>;
  setWinningCells: Dispatch<SetStateAction<number[][]>>;
  setRecord: Dispatch<SetStateAction<GameRecord>>;
  board: string[][]; // 3x3 array of 'X', 'O', or ''
  record: GameRecord;
  players: Players;
  winningCells: number[][];
};
