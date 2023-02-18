import React from 'react';
import Board from './Board';
import Header from '../Header/Header';
import './MineSweeper.css';

const MineSweeper = () => (
  <div className="mine-sweeper">
    <div className="mine-sweeper-container">
      <Header
        useDarkMode
        title="Mine Sweeper"
        repoLink="https://github.com/CalCorbin/cal-portfolio/blob/master/src/components/MineSweeper/Board.tsx"
      />
      <div>
        <Board height={8} width={8} mines={10} />
      </div>
    </div>
  </div>
);

export default MineSweeper;
