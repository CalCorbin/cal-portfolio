import Board from './Board';
import Header from '../Header/Header';
import styles from './MineSweeper.module.css';

const MineSweeper = () => (
  <div className={styles['mine-sweeper']} data-testid="mine-sweeper">
    <div className={styles['mine-sweeper-container']}>
      <Header
        useDarkMode
        title="Mine Sweeper"
        repoLink="https://github.com/CalCorbin/cal-portfolio/blob/main/src/components/MineSweeper/Board.tsx"
      />
      <div>
        <Board height={8} width={8} mines={10} />
      </div>
    </div>
  </div>
);

export default MineSweeper;
