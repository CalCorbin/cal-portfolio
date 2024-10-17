import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MineSweeper from './MineSweeper';

describe('MineSweeper', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<MineSweeper />);
    expect(getByTestId('mine-sweeper')).toBeInTheDocument();
  });
});
