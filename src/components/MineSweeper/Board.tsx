import { useEffect, useState, useCallback } from 'react';
import Cell from './Cell';
import placeMines from './functions/placeMines';
import './Board.css';

type BoardProps = {
  height: number;
  width: number;
  mines: number;
};

const Board = ({ height, width, mines }: BoardProps) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [boardKey, setBoardKey] = useState(0);
  const [minePositions, setMinePositions] = useState<number[][]>([]);
  const [emptyCells, setEmptyCells] = useState<string[]>([]);

  const handlePlacesMines = useCallback(
    (firstMine?: undefined | number[]) =>
      placeMines({ height, width, mines, firstMine }),
    [height, width, mines]
  );

  // Place mines on initial render
  useEffect(() => setMinePositions(handlePlacesMines()), []);

  const isWin = useCallback(() => {
    const totalCells = height * width;
    const revealedCells = document.querySelectorAll('.revealed').length;
    return revealedCells === totalCells - mines;
  }, [height, width, mines]);

  const handleClick = useCallback(() => {
    if (isWin()) setIsWinner(true);
  }, [isWin, isFirstClick]);

  /**
   * Add event listener to check for win condition.
   */
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });

  const checkForMine = (x: number, y: number) =>
    minePositions.some((el) => el[0] === x && el[1] === y);

  /**
   * Handle first click on cell, if first click is a mine,
   * then this will move the mine to a different position.
   * @param x {number} - x position on board
   * @param y {number} - y position on board
   */
  const handleFirstCellClick = (x: number, y: number) => {
    if (isFirstClick) {
      moveMineOnFirstClick(x, y);
      setIsFirstClick(false);
    }
  };

  /**
   * Move mine to a different position if first click is a mine.
   * @param x {number} - x position on board
   * @param y {number} - y position on board
   */
  const moveMineOnFirstClick = (x: number, y: number) => {
    const isMine = checkForMine(x, y);
    if (!isMine) return;
    setMinePositions(handlePlacesMines([x, y]));
  };

  const getNeighbourCount = (x: number, y: number) => {
    let count = 0;
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if (checkForMine(x + i, y + j) && (i !== 0 || j !== 0)) {
          count += 1;
        }
      }
    }
    return count;
  };

  /**
   * Reveal empty cells if count is 0.
   * @param count {number} - number of mines in neighbouring cells
   * @param row {number} - row of cell
   * @param cell {number} - cell of cell
   * @param checkedCells {string[]} - array of cells already checked
   */
  const revealEmptyCells = (
    count: number,
    row: number,
    cell: number,
    checkedCells: Set<string> = new Set()
  ) => {
    if (count !== 0) return;
    if (row < 0 || row >= height || cell < 0 || cell >= width) return;
    const cellId = `row-${row}-cell-${cell}`;

    // Return early if cell has already been checked
    if (checkedCells.has(cellId)) return;
    const cellElement = document.getElementById(cellId);
    if (cellElement?.classList.contains('revealed')) return;

    checkedCells.add(cellId);

    const cellsToUpdate: string[] = [];
    const cellsToCheck: number[][] = [];

    const addCellToUpdateAndCheck = (updateRow: number, updateCell: number) => {
      const neighbourCount = getNeighbourCount(row, cell);
      if (neighbourCount === 0 && cellElement) {
        cellsToUpdate.push(cellId);
        cellsToCheck.push([updateRow, updateCell]);
      }
    };

    let toLeft = cell;
    while (toLeft > -1) {
      addCellToUpdateAndCheck(row, toLeft);
      if (getNeighbourCount(row, toLeft) > 0) break;
      toLeft -= 1;
    }

    let toRight = cell;
    while (toRight < width) {
      addCellToUpdateAndCheck(row, toRight);
      if (getNeighbourCount(row, toRight) > 0) break;
      toRight += 1;
    }

    let toTop = row;
    while (toTop > -1) {
      addCellToUpdateAndCheck(toTop, cell);
      if (getNeighbourCount(toTop, cell) > 0) break;
      toTop -= 1;
    }

    let toBottom = row;
    while (toBottom < height) {
      addCellToUpdateAndCheck(toBottom, cell);
      if (getNeighbourCount(toBottom, cell) > 0) break;
      toBottom += 1;
    }

    for (let i = cellsToCheck.length - 1; i >= 0; i -= 1) {
      const [cellRow, checkCell] = cellsToCheck[i];
      const cellCount = getNeighbourCount(cellRow, checkCell);
      revealEmptyCells(cellCount, cellRow, checkCell, checkedCells);
    }

    setEmptyCells((prev) => [...prev, ...cellsToUpdate]);
  };

  const resetGame = () => {
    setIsGameOver(false);
    setIsWinner(false);
    setIsFirstClick(true);
    setBoardKey((prev) => prev + 1);
    setMinePositions(handlePlacesMines());
    setEmptyCells([]);
  };

  return (
    <div data-testid="board-container">
      <div data-testid="board-rows" key={boardKey}>
        {[...Array(height)].map((_, x) => {
          const rowId = `row-${x}`;
          return (
            <div data-testid="board-row" className="mine-row" key={rowId}>
              {[...Array(width)].map((__, y) => {
                const cellId = `row-${x}-cell-${y}`;
                const neighbourCount = getNeighbourCount(x, y);
                const isMine = checkForMine(x, y);
                return (
                  <Cell
                    key={cellId}
                    cellId={cellId}
                    isMine={isMine}
                    isFirstClick={isFirstClick}
                    neighbourCount={neighbourCount}
                    setIsGameOver={setIsGameOver}
                    isGameOver={isGameOver}
                    onClick={() => {
                      handleFirstCellClick(x, y);
                    }}
                    revealEmptyCells={() =>
                      revealEmptyCells(neighbourCount, x, y)
                    }
                    shouldReveal={emptyCells.includes(cellId)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="mine-sweeper-messages">
        <div data-testid="game-info">
          <span>Mines: {mines}</span>
        </div>
        <button
          type="button"
          data-testid="reset-button"
          className="reset-button"
          onClick={resetGame}
        >
          Reset Game
        </button>
        <div
          data-testid="game-over"
          className="end-game-message"
          style={{ display: !isGameOver && !isWinner ? 'none' : 'block' }}
        >
          {(isGameOver || isWinner) && (
            <span>{isGameOver ? 'Game Over' : 'You Win!'}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
