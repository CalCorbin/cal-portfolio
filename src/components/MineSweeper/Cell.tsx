import './Cell.css';
import { useState } from 'react';

type CellProps = {
  x: number;
  y: number;
  isMine: boolean;
  isFlagged: boolean;
  neighbourCount: number;
};

const Cell = ({ x, y, isMine, isFlagged, neighbourCount }: CellProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  return (
    <button
      data-testid="board-cell"
      type="button"
      className={`cell ${isRevealed ? 'revealed' : ''} ${
        isFlagged ? 'flagged' : ''
      }`}
      onClick={() => setIsRevealed(true)}
    >
      {isRevealed && isFlagged && '🚩'}
      {isRevealed && isMine && '💣'}
      {isRevealed && !isMine && neighbourCount > 0 && neighbourCount}
    </button>
  );
};

export default Cell;
