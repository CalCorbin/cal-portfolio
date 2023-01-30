type BoardProps = {
  height: number;
  width: number;
  mines: number;
};

const Board = ({ height, width, mines }: BoardProps) => (
  <div data-testid="board-container">
    <div data-testid="board-rows">
      {[...Array(height)].map((_, i) => (
        <div data-testid="board-row" key={i}>
          {[...Array(width)].map((_, j) => (
            <div data-testid="board-cell" key={j} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Board;
