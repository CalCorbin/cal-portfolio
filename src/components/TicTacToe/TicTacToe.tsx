/* istanbul ignore file */
import { useState, useEffect, useCallback, useMemo } from 'react';
import ToastNotification from './ToastNotification';
import Header from '../Header/Header';
import BackButton from '../BackButton/BackButton';
import BoardRow from './BoardRow';
import useCheckForWinner from './hooks/useCheckForWinner';
import getCpuTurn from './functions/getCpuTurn';
import { GameRecord, PlayerOption, Players, Winner } from './types';
import displayWinner from './functions/displayWinner';
import styles from './TicTacToe.module.css';

type TicTacToeProps = {
  selectedPlayer: PlayerOption;
};

const TicTacToe = ({ selectedPlayer }: TicTacToeProps) => {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [isCpuNext, setIsCpuNext] = useState(false);
  const [winner, setWinner] = useState<Winner>(null);
  const [winningCells, setWinningCells] = useState<number[][]>([]);
  const [record, setRecord] = useState<GameRecord>({
    X: 0,
    O: 0,
  });

  const opponent: PlayerOption = selectedPlayer === 'X' ? 'O' : 'X';
  const players = useMemo<Players>(
    () => ({
      CPU: opponent,
      HUMAN: selectedPlayer,
    }),
    [selectedPlayer, opponent]
  );
  const checkForWinner = useCallback(
    () =>
      useCheckForWinner({
        setWinner,
        setWinningCells,
        setRecord,
        board,
        record,
        players,
        winningCells,
      }),
    [
      setWinner,
      setWinningCells,
      setRecord,
      board,
      record,
      players,
      winningCells,
    ]
  );

  const getCpuTurnCallback = useCallback(() => getCpuTurn(board), [board]);

  /**
   * This function is called when it's the CPU's turn.
   */
  const playCpuTurn = useCallback(() => {
    const cpuMove = getCpuTurnCallback();

    board[cpuMove.arrayIndex][cpuMove.index] = players?.CPU;

    setBoard((prevBoard) => [...prevBoard]);
    checkForWinner();
    setIsCpuNext(false);
  }, [getCpuTurnCallback, checkForWinner, setBoard, board, players]);

  /**
   * This function handles the player's turn.
   * @param e {object} - The event object.
   * @param row {number} - The row selected by the player.
   * @param index {number} - The index within the row selected by the player.
   */
  const playRound = (
    e: React.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLSpanElement>,
    row: number,
    index: number
  ) => {
    const { key } = e as React.KeyboardEvent<HTMLInputElement>;
    if (key && key !== 'Enter') {
      return;
    }

    // If the cell is already filled, the CPU is next, or there is a winner, return.
    if (board[row][index] !== '') return;
    if (isCpuNext) return;
    if (winner) return;

    board[row][index] = players?.HUMAN;
    setBoard((prevBoard) => [...prevBoard]);
    checkForWinner();
    setIsCpuNext(true);
  };

  /**
   * This function handles displaying the current players turn.
   */
  const displayTurn = () => {
    if (isCpuNext) {
      return `${opponent}'S TURN`;
    }
    return `${selectedPlayer}'S TURN`;
  };

  /**
   * This function handles resetting the game.
   */
  const playAgain = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setWinningCells([]);
    setWinner(null);
    setIsCpuNext(false);
  };

  /**
   * This useEffect handles updating the board to simulate the CPU's turn.
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (winner) return undefined;
    if (isCpuNext) {
      // Here we use setTimeout to simulate the CPU's turn,
      // 2000 milliseconds gives the appearance of the CPU thinking.
      timer = setTimeout(playCpuTurn, 2000);
    }
    return () => clearTimeout(timer);
  }, [playCpuTurn, board, winner, isCpuNext]);

  return (
    <div className={styles['tictactoe-background']}>
      <div className={styles.container}>
        <BackButton />
        <Header
          title="Tic Tac Toe"
          repoLink="https://github.com/CalCorbin/cal-portfolio/blob/master/src/components/TicTacToe/TicTacToe.tsx"
        />
        <ToastNotification message="NOW IN GAME" deleteTime={2000} />
        <div className={styles['current-turn']} data-testid="turn-display">
          {winner ? displayWinner(winner, record) : displayTurn()}
        </div>
        <div data-testid="tictactoe-screen">
          <div className={styles['board-row']} data-testid="row-0">
            {board[0].map((cell, index) => (
              <BoardRow
                row={0}
                rowIndex={index}
                onCellClick={playRound}
                board={board}
                winningCells={winningCells}
                key={`row-0-${index * Math.random()}`}
              />
            ))}
          </div>
          <div className={styles['board-row']} data-testid="row-1">
            {board[1].map((cell, index) => (
              <BoardRow
                row={1}
                rowIndex={index}
                onCellClick={playRound}
                board={board}
                winningCells={winningCells}
                key={`row-1-${index * Math.random()}`}
              />
            ))}
          </div>
          <div className={styles['board-row']} data-testid="row-2">
            {board[2].map((cell, index) => (
              <BoardRow
                row={2}
                rowIndex={index}
                onCellClick={playRound}
                board={board}
                winningCells={winningCells}
                key={`row-2-${index * Math.random()}`}
              />
            ))}
          </div>
        </div>
        <button
          className={styles['game-button']}
          // Using visibility here ensures the tictactoe box doesn't shift when the button is hidden.
          style={{ visibility: winner ? 'visible' : 'hidden' }}
          onClick={playAgain}
          type="button"
          data-testid="play-again"
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
