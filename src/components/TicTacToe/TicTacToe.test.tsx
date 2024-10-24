import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import TicTacToe from './TicTacToe';

describe('TicTacToe', () => {
  it('should render correct player option when player clicks a cell during the game', async () => {
    render(<TicTacToe selectedPlayer="O" />);

    const cell = screen.getByTestId('cell-0-0');
    cell.click();
    await waitFor(() => {
      expect(cell.textContent).toBe('O');
    });
  });

  it('should not update the cell if player presses a key besides enter', async () => {
    render(<TicTacToe selectedPlayer="O" />);

    const cell = screen.getByTestId('cell-0-0');
    fireEvent.keyDown(cell, { key: 'A', code: 'KeyA' });
    await waitFor(() => {
      expect(cell.textContent).toBe('');
    });
  });

  it('should let the cpu play after the player plays', async () => {
    render(<TicTacToe selectedPlayer="O" />);

    const cell = screen.getByTestId('cell-0-0');
    cell.click();
    await waitFor(() => {
      expect(cell.textContent).toBe('O');
    });
    expect(cell.textContent).toBe('O');
    await waitFor(
      () => {
        const { getByText } = within(screen.getByTestId('tictactoe-screen'));
        expect(getByText('X')).toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });

  it('should reset the game when the player clicks the reset button', async () => {
    render(<TicTacToe selectedPlayer="O" />);

    // Play a round
    let cell = screen.getByTestId('cell-0-0');
    cell.click();

    // Reset the game
    const resetButton = screen.getByTestId('play-again');
    resetButton.click();

    // Check that the cell is empty
    cell = screen.getByTestId('cell-0-0');
    expect(cell.textContent).toBe('');
  });
});
