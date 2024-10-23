import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import MineSweeper from './MineSweeper';

describe('MineSweeper', () => {
  const prepareComponent = () => render(<MineSweeper />);
  afterEach(cleanup);

  it('should render back button', () => {
    prepareComponent();
    expect(screen.getByLabelText('Go back')).toBeInTheDocument();
  });
});
