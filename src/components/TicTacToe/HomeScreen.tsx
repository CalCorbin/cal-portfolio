import React, { useState } from 'react';
import './HomeScreen.css';
import MatchScreen from './MatchScreen';
import TicTacToe from './TicTacToe';
import Header from '../Header/Header';
import { PlayerOption } from './types';

const HomeScreen = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerOption>('');
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

  if (isMatching) {
    return <MatchScreen />;
  }

  if (gameStarted) {
    return <TicTacToe selectedPlayer={selectedPlayer} />;
  }

  return (
    <div className="home-screen tictactoe-background" data-testid="home-screen">
      <Header
        title="Tic Tac Toe"
        repoLink="https://github.com/CalCorbin/cal-portfolio/blob/master/src/components/TicTacToe/TicTacToe.tsx"
      />
      <div className="item">WELCOME</div>
      <div className="item">PICK YOUR PLAYER</div>
      <div className="item player-selection">
        <div
          className="player-selection__player"
          onClick={() => handlePlayerSelect('X')}
          onKeyDown={(e) => handleKeySelect(e, 'X')}
          role="button"
          tabIndex={0}
        >
          <span>X</span>
          <hr
            data-testid="player-x-underline"
            className={`player-selection__underline ${
              selectedPlayer === 'X' ? 'active' : ''
            }`}
          />
        </div>
        <div
          className="player-selection__player"
          onClick={() => handlePlayerSelect('O')}
          onKeyDown={(e) => handleKeySelect(e, 'O')}
          role="button"
          tabIndex={0}
        >
          <span>O</span>
          <hr
            data-testid="player-o-underline"
            className={`player-selection__underline ${
              selectedPlayer === 'O' ? 'active' : ''
            }`}
          />
        </div>
      </div>
      <button
        className={`match-button ${!selectedPlayer && 'disabled'}`}
        onClick={handleMatch}
        disabled={!selectedPlayer}
        type="button"
      >
        MATCH ME WITH MY OPPONENT
      </button>
    </div>
  );
};

export default HomeScreen;
