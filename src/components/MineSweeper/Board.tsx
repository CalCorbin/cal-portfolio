import { useEffect, useState, useCallback } from 'react';
import Cell from './Cell';
import './Board.css';

type BoardProps = {
  height: number;
  width: number;
  mines: number;
};

const Board = ({ height, width, mines }: BoardProps) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [boardKey, setBoardKey] = useState(0);
  const [minePositions, setMinePositions] = useState<number[][]>([]);

  const placeMines = useCallback(() => {
    const minePlacements: number[][] = [];
    for (let i = 0; i < mines; i += 1) {
      const x = Math.floor(Math.random() * height);
      const y = Math.floor(Math.random() * width);
      minePlacements.push([x, y]);
    }
    return minePlacements;
  }, [height, width, mines]);

  // Place mines on initial render
  useEffect(() => setMinePositions(placeMines()), []);

  const isWin = useCallback(() => {
    const totalCells = height * width;
    const revealedCells = document.querySelectorAll('.revealed').length;
    return revealedCells === totalCells - mines;
  }, [height, width, mines]);

  useEffect(() => {
    document.addEventListener('click', () => {
      if (isWin()) setIsWinner(true);
    });

    return () =>
      document.removeEventListener('click', () => {
        if (isWin()) setIsWinner(true);
      });
  });

  const checkForMine = (x: number, y: number) =>
    minePositions.some((el) => el[0] === x && el[1] === y);

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

  const resetGame = () => {
    setIsGameOver(false);
    setBoardKey((prev) => prev + 1);
    setMinePositions(placeMines());
  };

  return (
    <div data-testid="board-container">
      <div data-testid="game-info">
        <span>Mines: {mines}</span>
      </div>
      <div data-testid="board-rows" key={boardKey}>
        {[...Array(height)].map((_, i) => {
          const rowId = `row-${i}`;
          return (
            <div data-testid="board-row" className="mine-row" key={rowId}>
              {[...Array(width)].map((__, j) => {
                const cellId = `row-${i}-cell-${j}`;
                return (
                  <Cell
                    key={cellId}
                    isMine={checkForMine(i, j)}
                    neighbourCount={getNeighbourCount(i, j)}
                    setIsGameOver={setIsGameOver}
                    isGameOver={isGameOver}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {isGameOver && (
        <div data-testid="game-over">
          <span>Game Over</span>
          <button type="button" onClick={resetGame}>
            Reset
          </button>
        </div>
      )}
      {isWinner && (
        <div data-testid="game-win">
          <span>You Win!</span>
          <button type="button" onClick={resetGame}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;
