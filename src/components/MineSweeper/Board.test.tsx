import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from './Board';

describe('Board', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Board height={8} width={8} mines={10} />);
    expect(getByTestId('board-container')).toBeInTheDocument();
  });

  it('should render the correct number of rows', () => {
    const { getAllByTestId } = render(
      <Board height={8} width={8} mines={10} />
    );
    expect(getAllByTestId('board-row')).toHaveLength(8);
  });

  it('should render the correct number of cells', () => {
    const { getAllByTestId } = render(
      <Board height={8} width={8} mines={10} />
    );
    expect(getAllByTestId('board-cell')).toHaveLength(64);
  });

  it('should reveal a cell', async () => {
    const { getAllByTestId } = render(
      <Board height={8} width={8} mines={10} />
    );
    const cells = getAllByTestId('board-cell');

    await waitFor(() => {
      cells[0].click();
      expect(getAllByTestId('board-cell')[0]).toHaveClass('revealed');
    });
  });

  it('should reset the game when reset button is clicked', async () => {
    const { getAllByTestId, getByText } = render(
      <Board height={10} width={10} mines={10} />
    );
    const cell = getAllByTestId('board-cell')[0];
    let revealedCells = getAllByTestId('board-cell').filter((c) =>
      c.className.includes('revealed')
    );
    expect(revealedCells).toHaveLength(0);

    await waitFor(() => {
      // Ensure we revealed some cells
      fireEvent.click(cell);
      revealedCells = getAllByTestId('board-cell').filter((c) =>
        c.className.includes('revealed')
      );
      expect(revealedCells).toBeDefined();

      // Click the reset button
      const resetButton = getByText('Reset Game');
      fireEvent.click(resetButton);

      // Verify that all cells are hidden again
      revealedCells = getAllByTestId('board-cell').filter((c) =>
        c.className.includes('revealed')
      );
      expect(revealedCells).toHaveLength(0);
    });
  });

  it('should show game over message when a mine is clicked', async () => {
    const { getAllByTestId, getByText } = render(
      <Board height={8} width={8} mines={10} />
    );
    let cells = getAllByTestId('board-cell');
    let mineCell = cells.find((cell) => cell.className.includes('is-mine'));

    // Perform first click in the game, which is never going to be a mine.
    await waitFor(() => {
      if (!mineCell) throw new Error('No mine cell found');
      fireEvent.click(mineCell);
    });

    await waitFor(() => {
      cells = getAllByTestId('board-cell');
      mineCell = cells.find((cell) => cell.className.includes('is-mine'));
      if (!mineCell) throw new Error('No mine cell found');
      fireEvent.click(mineCell);
      expect(getByText('Game Over :(')).toBeInTheDocument();
    });
  });

  it('should show winner message when all non-mine cells are revealed', async () => {
    const { getAllByTestId, getByText } = render(
      <Board height={5} width={5} mines={1} />
    );
    const cells = getAllByTestId('board-cell');
    const nonMineCells = cells.filter(
      (cell) => !cell.className.includes('is-mine')
    );

    await waitFor(() => {
      nonMineCells.forEach((cell) => fireEvent.click(cell));
      expect(getByText('You Win!')).toBeInTheDocument();
    });
  });

  it('should show the correct number of mines', async () => {
    const { getAllByTestId } = render(
      <Board height={8} width={8} mines={10} />
    );
    const cells = getAllByTestId('board-cell');
    const mineCells = cells.filter((cell) =>
      cell.className.includes('is-mine')
    );
    expect(mineCells).toHaveLength(10);
  });

  it('should handle different board sizes', async () => {
    const { getAllByTestId } = render(
      <Board height={16} width={16} mines={40} />
    );
    const cells = getAllByTestId('board-cell');
    const mineCells = cells.filter((cell) =>
      cell.className.includes('is-mine')
    );
    expect(mineCells).toHaveLength(40);
  });

  it('should handle different sized height and width', async () => {
    const { getAllByTestId } = render(
      <Board height={16} width={8} mines={40} />
    );
    const cells = getAllByTestId('board-cell');
    const mineCells = cells.filter((cell) =>
      cell.className.includes('is-mine')
    );
    expect(mineCells).toHaveLength(40);
  });

  it('should handle different sized height and width, and show winner message when all non-mine cells are revealed', async () => {
    const { getAllByTestId, getByText } = render(
      <Board height={16} width={8} mines={40} />
    );
    const cells = getAllByTestId('board-cell');
    const nonMineCells = cells.filter(
      (cell) => !cell.className.includes('is-mine')
    );

    await waitFor(() => {
      nonMineCells.forEach((cell) => fireEvent.click(cell));
      expect(getByText('You Win!')).toBeInTheDocument();
    });
  });
});
