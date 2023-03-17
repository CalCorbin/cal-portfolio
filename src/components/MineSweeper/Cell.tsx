import './Cell.css';
import React, { useEffect, useState } from 'react';

type CellProps = {
  cellId: string;
  isMine: boolean;
  neighbourCount: number;
  setIsGameOver: (isGameOver: boolean) => void;
  isGameOver: boolean;
  isFirstClick: boolean;
  onClick: () => void;
  revealEmptyCells: () => void;
  shouldReveal: boolean;
};

const Cell = ({
  cellId,
  isMine,
  neighbourCount,
  setIsGameOver,
  isGameOver,
  isFirstClick,
  onClick,
  revealEmptyCells,
  shouldReveal,
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
    onClick();
    revealEmptyCells();
    setIsRevealed(true);
    if (isMine && !isFirstClick) {
      setIsGameOver(true);
    }
  };

  /**
   * Handle right click on cell, this will flag the cell.
   * @param e {React.MouseEvent} - Mouse event
   */
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isRevealed) return;
    setIsFlagged(!isFlagged);
  };

  useEffect(() => {
    if (shouldReveal) {
      setIsRevealed(true);
    }
    if (isGameOver) {
      setIsRevealed(true);
    }
  }, [isGameOver, shouldReveal]);

  return (
    <button
      id={cellId}
      data-testid="board-cell"
      type="button"
      className={`mine-cell${isRevealed ? ' revealed' : ''}${
        isMine ? ' is-mine' : ''
      }`}
      onClick={(e) => handleClick(e)}
      onContextMenu={(e) => handleContextMenu(e)}
    >
      {isFlagged && '🚩'}
      {isRevealed && isMine && '💣'}
      {isRevealed && !isMine && neighbourCount > 0 && neighbourCount}
      {isRevealed && !isMine && neighbourCount === 0 && ' '}
    </button>
  );
};

export default Cell;
