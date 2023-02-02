import './Cell.css';
import { useState } from 'react';

type CellProps = {
  isMine: boolean;
  neighbourCount: number;
};

const Cell = ({ isMine, neighbourCount }: CellProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRevealed(true);
  };

  return (
    <button
      data-testid="board-cell"
      type="button"
      className={`mine-cell ${isRevealed && 'revealed'}`}
      onClick={(e) => handleClick(e)}
    >
      {isRevealed && isMine && '💣'}
      {isRevealed && !isMine && neighbourCount > 0 && neighbourCount}
    </button>
  );
};

export default Cell;
