import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import MineSweeper from './MineSweeper';

describe('MineSweeper', () => {
  const prepareComponent = () => render(<MineSweeper />);
  afterEach(cleanup);

  it('should render', () => {
    prepareComponent();
    expect(
      screen.getByRole('heading', { name: 'Mine Sweeper' })
    ).toBeInTheDocument();
  });
});
