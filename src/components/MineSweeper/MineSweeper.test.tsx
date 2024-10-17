import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MineSweeper from './MineSweeper';

describe('MineSweeper', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<MineSweeper />);
    expect(getByTestId('mine-sweeper')).toBeInTheDocument();
  });

  it.skip('should click the back button and go back to the home page', () => {
    const { getByTestId } = render(<MineSweeper />);
    const backButton = getByTestId('back-button');
    expect(backButton).toBeInTheDocument();
    backButton.click();
    expect(window.history.length).toBe(1);
  });
});
