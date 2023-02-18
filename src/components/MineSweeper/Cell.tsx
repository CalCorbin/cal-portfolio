import './Cell.css';
import React, { useEffect, useState } from 'react';

type CellProps = {
  isMine: boolean;
  neighbourCount: number;
  setIsGameOver: (isGameOver: boolean) => void;
  isGameOver: boolean;
};

const Cell = ({
  isMine,
  neighbourCount,
  setIsGameOver,
  isGameOver,
}: CellProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

  /**
   * Handle click on cell, this will reveal the cell.
   * @param e {React.MouseEvent} - Mouse event
   */
  const handleClick = (e: React.MouseEvent) => {
    if (isFlagged) return;
    e.preventDefault();
    setIsRevealed(true);
    if (isMine) setIsGameOver(true);
  };

  /**
   * Handle right click on cell, this will flag the cell.
   * @param e {React.MouseEvent} - Mouse event
   */
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFlagged(!isFlagged);
  };

  useEffect(() => {
    if (isGameOver) {
      setIsRevealed(true);
    }
  }, [isGameOver]);

  return (
    <button
      data-testid="board-cell"
      type="button"
      className={`mine-cell${isRevealed ? ' revealed' : ''}${
        isMine ? ' is-mine' : ''
      }`}
      onClick={(e) => handleClick(e)}
      onContextMenu={(e) => handleContextMenu(e)}
      disabled={isRevealed || isGameOver}
    >
      {isFlagged && '🚩'}
      {isRevealed && isMine && '💣'}
      {isRevealed && !isMine && neighbourCount > 0 && neighbourCount}
      {isRevealed && !isMine && neighbourCount === 0 && ' '}
    </button>
  );
};

export default Cell;
