import { useState } from 'react';
import Board from './Board';

const MineSweeper = () => (
  <div data-testid="mine-sweeper-container">
    <Board height={8} width={8} mines={10} />
  </div>
);

export default MineSweeper;
