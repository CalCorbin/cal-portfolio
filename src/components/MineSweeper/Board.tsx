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
  const [boardKey, setBoardKey] = useState(0);
  const [minePositions, setMinePositions] = useState<number[][]>([]);

  const handlePlacesMines = useCallback(
    () => placeMines({ height, width, mines }),
    [height, width, mines]
  );

  // Place mines on initial render
  useEffect(() => setMinePositions(handlePlacesMines()), []);

  const isWin = useCallback(() => {
    const totalCells = height * width;
    const revealedCells = document.querySelectorAll('.revealed').length;
    return revealedCells === totalCells - mines;
  }, [height, width, mines]);

  const listener = useCallback(() => {
    if (isWin()) setIsWinner(true);
  }, [isWin]);

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
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
    setIsWinner(false);
    setBoardKey((prev) => prev + 1);
    setMinePositions(handlePlacesMines());
  };

  return (
    <div data-testid="board-container">
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
