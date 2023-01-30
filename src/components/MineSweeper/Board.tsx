import Cell from './Cell';

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

  const getNeighbourCount = (x: number, y: number) => {
    let count = 0;
    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        // Skip the current cell
        if (i === 0 && j === 0) return;
        // Skip if out of bounds
        if (x + i < 0 || x + i >= height || y + j < 0 || y + j >= width) return;
        // Check if neighbour is a mine
        if (minePositions.includes([x + i, y + j])) count += 1;
      }
    }
    return count;
  };
  return (
    <div data-testid="board-container">
      <div data-testid="game-info">
        <span>Mines: {mines}</span>
      </div>
      <div data-testid="board-rows">
        {[...Array(height)].map((_, i) => (
          <div data-testid="board-row" key={i}>
            {[...Array(width)].map((_, j) => (
              <Cell
                data-testid="board-cell"
                key={j}
                x={i}
                y={j}
                isMine={false}
                isRevealed={false}
                isFlagged={false}
                neighbourCount={0}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
