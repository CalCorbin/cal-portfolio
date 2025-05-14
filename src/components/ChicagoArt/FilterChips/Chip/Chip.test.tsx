import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chip from './Chip';

describe('<Chip/>', () => {
  it('should render as inactive by default', () => {
    render(<Chip label="Polish Sausage" />);

    const chip = screen.getByTestId('chip');
    expect(chip).toBeInTheDocument();
    expect(chip).not.toHaveClass('active');
  });

  it('should be active when clicked', () => {
    render(<Chip label="Polish Sausage" />);

    let chip = screen.getByTestId('chip');
    expect(chip).toBeInTheDocument();
    expect(chip).not.toHaveClass('active');

    fireEvent.click(chip);
    chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('active');
  });
});
