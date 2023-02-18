import React from 'react';
import Board from './Board';
import Header from '../Header/Header';
import './MineSweeper.css';

const MineSweeper = () => (
  <div className="minesweeper">
    <Header
      title="Mine Sweeper"
      repoLink="https://github.com/CalCorbin/cal-portfolio/blob/master/src/components/MineSweeper/Board.tsx"
    />
    <div
      data-testid="mine-sweeper-container"
      className="mine-sweeper-container"
    >
      <Board height={8} width={8} mines={10} />
    </div>
  </div>
);

export default MineSweeper;
