import { useState } from 'react';
import Board from './Board';

const MineSweeper = () => {
  const [height, setHeight] = useState(8);
  const [width, setWidth] = useState(8);
  const [mines, setMines] = useState(10);

  return (
    <div data-testid="mine-sweeper-container">
      <Board height={height} width={width} mines={mines} />
    </div>
  );
};

export default MineSweeper;
