import './Cell.css';
import React, { useState } from 'react';

type CellProps = {
  isMine: boolean;
  neighbourCount: number;
};

const Cell = ({ isMine, neighbourCount }: CellProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

  /**
   * Handle click on cell, this will reveal the cell.
   * @param e {React.MouseEvent} - Mouse event
   */
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRevealed(true);
  };

  /**
   * Handle right click on cell, this will flag the cell.
   * @param e {React.MouseEvent} - Mouse event
   */
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFlagged(true);
  };

  return (
    <button
      data-testid="board-cell"
      type="button"
      className={`mine-cell ${isRevealed && 'revealed'}`}
      onClick={(e) => handleClick(e)}
      onContextMenu={(e) => handleContextMenu(e)}
    >
      {isFlagged && '🚩'}
      {isRevealed && isMine && '💣'}
      {isRevealed && !isMine && neighbourCount > 0 && neighbourCount}
    </button>
  );
};

export default Cell;
