import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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
});
