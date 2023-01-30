import './Cell.css';
import { useState } from 'react';

type CellProps = {
  isMine: boolean;
  isFlagged: boolean;
  neighbourCount: number;
};

const Cell = ({ isMine, isFlagged, neighbourCount }: CellProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  return (
    <button
      data-testid="board-cell"
      type="button"
      className="mine-cell"
      onClick={() => setIsRevealed(true)}
    >
      {isRevealed && isFlagged && '🚩'}
      {isRevealed && isMine && '💣'}
      {isRevealed && !isMine && neighbourCount > 0 && neighbourCount}
    </button>
  );
};

export default Cell;
