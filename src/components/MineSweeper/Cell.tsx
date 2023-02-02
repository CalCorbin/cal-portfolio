import './Cell.css';
import { useEffect, useState } from 'react';

type CellProps = {
  isMine: boolean;
  neighbourCount: number;
};

const Cell = ({ isMine, neighbourCount }: CellProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRevealed(true);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFlagged(!isFlagged);
  };

  useEffect(() => {
    document.addEventListener('contextmenu', () => handleContextMenu);
    document.addEventListener('click', () => handleClick);
    return () => {
      document.removeEventListener('contextmenu', () => handleContextMenu);
      document.removeEventListener('click', () => handleClick);
    };
  });

  return (
    <button
      data-testid="board-cell"
      type="button"
      className={`mine-cell ${isRevealed && 'revealed'}`}
      onClick={(e) => handleClick(e)}
    >
      {isRevealed && isFlagged && '🚩'}
      {isRevealed && isMine && '💣'}
      {isRevealed && !isMine && neighbourCount > 0 && neighbourCount}
    </button>
  );
};

export default Cell;
