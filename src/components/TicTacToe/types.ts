export type PlayerOption = 'X' | 'O' | '';
export type GameRecord = Record<PlayerOption, number>;
export type Players = Record<'CPU' | 'HUMAN', PlayerOption>;
