import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cell from './Cell';

describe('Cell', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Cell isMine={false} neighbourCount={0} />);
    expect(getByTestId('board-cell')).toBeInTheDocument();
  });

  it('should render a mine', async () => {
    const { getByTestId } = render(<Cell isMine neighbourCount={0} />);
    const cell = getByTestId('board-cell');

    await waitFor(() => {
      cell.click();
      expect(getByTestId('board-cell')).toHaveTextContent('💣');
    });
  });

  it('should render neighbour count', async () => {
    const { getByTestId } = render(<Cell isMine={false} neighbourCount={3} />);
    const cell = getByTestId('board-cell');

    await waitFor(() => {
      cell.click();
      expect(getByTestId('board-cell')).toHaveTextContent('3');
    });
  });
});
