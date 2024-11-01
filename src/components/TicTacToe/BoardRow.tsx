import styles from './BoardRow.module.css';

type BoardRowProps = {
  row: number;
  rowIndex: number;
  onCellClick: (
    e: React.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLSpanElement>,
    row: number,
    rowIndex: number
  ) => void;
  board: string[][];
  winningCells?: number[][];
};

const BoardRow = ({
  row,
  rowIndex,
  onCellClick,
  board,
  winningCells = [],
}: BoardRowProps) => {
  let borderClasses = '';

  if (row === 0 || row === 1) {
    borderClasses += `${rowIndex !== 2 && styles['border-right']} ${
      styles['border-bottom']
    }`;
  } else {
    borderClasses += `${rowIndex !== 2 && styles['border-right']}`;
  }

  const isWinningCell = winningCells?.some(
    (cell) => cell[0] === row && cell[1] === rowIndex
  )
    ? 'winning-cell'
    : '';

  return (
    <span
      onClick={(e) => onCellClick(e, row, rowIndex)}
      onKeyDown={(e) => onCellClick(e, row, rowIndex)}
      className={`${styles.cell} ${borderClasses} ${styles[isWinningCell]}`}
      data-testid={`cell-${row}-${rowIndex}`}
      role="button"
      tabIndex={0}
    >
      {board[row][rowIndex]}
    </span>
  );
};

export default BoardRow;
