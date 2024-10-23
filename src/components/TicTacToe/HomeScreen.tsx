import { useState } from 'react';
import MatchScreen from './MatchScreen';
import TicTacToe from './TicTacToe';
import Header from '../Header/Header';
import BackButton from '../BackButton/BackButton';
import { PlayerOption } from './types';
import styles from './HomeScreen.module.css';

const HomeScreen = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerOption | null>(
    null
  );
  const [isMatching, setIsMatching] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handlePlayerSelect = (player: PlayerOption) => {
    setSelectedPlayer(player);
  };

  const handleKeySelect = (
    e: React.KeyboardEvent<HTMLDivElement>,
    player: PlayerOption
  ) => {
    /* istanbul ignore else */
    if (e.key === 'Enter') {
      handlePlayerSelect(player);
    }
  };

  const handleMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setGameStarted(true);
    }, 3000);
  };

  return (
    <div
      className={`${styles['home-screen']} ${styles['tictactoe-background']}`}
      data-testid="home-screen"
    >
      {isMatching ? (
        <MatchScreen />
      ) : gameStarted && selectedPlayer ? (
        <TicTacToe selectedPlayer={selectedPlayer} />
      ) : (
        <>
          <BackButton />
          <Header
            title="Tic Tac Toe"
            repoLink="https://github.com/CalCorbin/cal-portfolio/blob/master/src/components/TicTacToe/TicTacToe.tsx"
          />
          <div className={styles.item}>WELCOME</div>
          <div className={styles.item}>PICK YOUR PLAYER</div>
          <div className={`${styles.item} ${styles['player-selection']}`}>
            <div
              className={styles['player-selection__player']}
              onClick={() => handlePlayerSelect('X')}
              onKeyDown={(e) => handleKeySelect(e, 'X')}
              role="button"
              tabIndex={0}
            >
              <span>X</span>
              <hr
                data-testid="player-x-underline"
                className={`${styles['player-selection__underline']} ${
                  selectedPlayer === 'X' ? styles.active : ''
                }`}
              />
            </div>
            <div
              className={styles['player-selection__player']}
              onClick={() => handlePlayerSelect('O')}
              onKeyDown={(e) => handleKeySelect(e, 'O')}
              role="button"
              tabIndex={0}
            >
              <span>O</span>
              <hr
                data-testid="player-o-underline"
                className={`${styles['player-selection__underline']} ${
                  selectedPlayer === 'O' ? styles.active : ''
                }`}
              />
            </div>
          </div>
          <button
            className={`${styles['match-button']} ${
              !selectedPlayer ? styles.disabled : ''
            }`}
            onClick={handleMatch}
            disabled={!selectedPlayer}
            type="button"
          >
            MATCH ME WITH MY OPPONENT
          </button>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
