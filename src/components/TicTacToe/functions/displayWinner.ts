import { GameRecord, Winner } from '../types';

/**
 * Display the winner of the game
 * @param winner {string} - the winner of the game
 * @param record {object} - the record of the game
 */
export default function displayWinner(winner: Winner, record: GameRecord) {
  if (!winner) return 'no winner';
  if (winner === 'draw') {
    return "IT'S A DRAW!";
  }
  if (record[winner] > 1) {
    return `${winner} WINS AGAIN!`;
  }
  return `${winner} WINS!`;
}
