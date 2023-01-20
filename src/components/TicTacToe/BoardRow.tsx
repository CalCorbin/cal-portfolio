import React from 'react';
import './BoardRow.css';

type BoardRowProps = {
  row: number;
  rowIndex: number;
  onCellClick: (
    e: React.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLSpanElement>,
    row: number,
    rowIndex: number
  ) => void;
  board: string[][];
};

const BoardRow = ({ row, rowIndex, onCellClick, board }: BoardRowProps) => {
  let classes = '';

  if (row === 0 || row === 1) {
    classes += `${rowIndex !== 2 && 'border-right'} border-bottom`;
  } else {
    classes += `${rowIndex !== 2 && 'border-right'}`;
  }

  return (
    <span
      onClick={(e) => onCellClick(e, row, rowIndex)}
      onKeyDown={(e) => onCellClick(e, row, rowIndex)}
      className={`cell ${classes}`}
      data-testid={`cell-${row}-${rowIndex}`}
      role="button"
      tabIndex={0}
    >
      {board[row][rowIndex]}
    </span>
  );
};

export default BoardRow;
