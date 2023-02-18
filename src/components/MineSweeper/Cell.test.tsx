import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cell from './Cell';

describe('Cell', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <Cell
        isMine={false}
        neighbourCount={0}
        setIsGameOver={jest.fn()}
        isGameOver={false}
      />
    );
    expect(getByTestId('board-cell')).toBeInTheDocument();
  });

  it('should render a mine', async () => {
    const { getByTestId } = render(
      <Cell
        isMine
        neighbourCount={0}
        setIsGameOver={jest.fn()}
        isGameOver={false}
      />
    );
    const cell = getByTestId('board-cell');

    await waitFor(() => {
      cell.click();
      expect(getByTestId('board-cell')).toHaveTextContent('💣');
    });
  });

  it('should render neighbour count', async () => {
    const { getByTestId } = render(
      <Cell
        isMine={false}
        neighbourCount={3}
        setIsGameOver={jest.fn()}
        isGameOver={false}
      />
    );
    const cell = getByTestId('board-cell');

    await waitFor(() => {
      cell.click();
      expect(getByTestId('board-cell')).toHaveTextContent('3');
    });
  });

  it('should render a blank cell', async () => {
    const { getByTestId } = render(
      <Cell
        isMine={false}
        neighbourCount={0}
        setIsGameOver={jest.fn()}
        isGameOver={false}
      />
    );
    const cell = getByTestId('board-cell');

    await waitFor(() => {
      cell.click();
      expect(getByTestId('board-cell')).toHaveTextContent('');
    });
  });

  it('should render a flag', async () => {
    const { getByTestId } = render(
      <Cell
        isMine={false}
        neighbourCount={0}
        setIsGameOver={jest.fn()}
        isGameOver={false}
      />
    );
    const cell = getByTestId('board-cell');

    await waitFor(() => {
      fireEvent.contextMenu(cell);
      expect(getByTestId('board-cell')).toHaveTextContent('🚩');
    });
  });

  it('should not let the user click on cell if the cell is flagged', async () => {
    const { getByTestId } = render(
      <Cell
        isMine={false}
        neighbourCount={0}
        setIsGameOver={jest.fn()}
        isGameOver={false}
      />
    );
    const cell = getByTestId('board-cell');

    await waitFor(() => {
      fireEvent.contextMenu(cell);
      expect(getByTestId('board-cell')).toHaveTextContent('🚩');
    });

    await waitFor(() => {
      fireEvent.click(cell);
      expect(getByTestId('board-cell')).not.toHaveClass('revealed');
    });
  });

  it('should reveal all cells if the game is over', async () => {
    const { getByTestId } = render(
      <Cell
        isMine={false}
        neighbourCount={0}
        setIsGameOver={jest.fn()}
        isGameOver
      />
    );
    const cell = getByTestId('board-cell');

    expect(cell).toHaveClass('revealed');
  });
});
