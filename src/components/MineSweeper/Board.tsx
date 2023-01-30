import Cell from './Cell';
import './Board.css';

type BoardProps = {
  height: number;
  width: number;
  mines: number;
};

const Board = ({ height, width, mines }: BoardProps) => {
  const placeMines = () => {
    const minePlacements = [];
    for (let i = 0; i < mines; i += 1) {
      const x = Math.floor(Math.random() * height);
      const y = Math.floor(Math.random() * width);
      minePlacements.push([x, y]);
    }
    return minePlacements;
  };
  const minePositions = placeMines();
  const checkForMine = (x: number, y: number) =>
    minePositions.some((el) => el[0] === x && el[1] === y);

  // const getNeighbourCount = (x: number, y: number) => {
  //   let count = 0;
  //   for (let i = -1; i < 2; i += 1) {
  //     for (let j = -1; j < 2; j += 1) {
  //       // Skip the current cell
  //       if (i === 0 && j === 0) continue;
  //       // Skip if out of bounds
  //       if (x + i < 0 || x + i >= height || y + j < 0 || y + j >= width)
  //         continue;
  //       // Check if neighbour is a mine
  //       if (minePositions.includes([x + i, y + j])) count += 1;
  //     }
  //   }
  //   return count;
  // };

  return (
    <div data-testid="board-container">
      <div data-testid="game-info">
        <span>Mines: {mines}</span>
      </div>
      <div data-testid="board-rows">
        {[...Array(height)].map((_, i) => {
          const rowId = `row-${i}`;
          return (
            <div data-testid="board-row" className="mine-row" key={rowId}>
              {[...Array(width)].map((__, j) => {
                const cellId = `row-${i}-cell-${j}`;
                return (
                  <Cell
                    key={cellId}
                    x={i}
                    y={j}
                    isMine={checkForMine(i, j)}
                    // isRevealed={false}
                    isFlagged={false}
                    neighbourCount={0}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
