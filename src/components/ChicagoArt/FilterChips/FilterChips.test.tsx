import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterChips from './FilterChips';

describe('FilterChips', () => {
  it('should render two filter chips', () => {
    render(<FilterChips filterOptions={['Print', 'Painting']} />);

    expect(screen.getByTestId('filter-chips')).toBeInTheDocument();

    const chips = screen.getAllByTestId('chip');

    // Assert that there are exactly 2 chips
    expect(chips).toHaveLength(2);
    expect(screen.getByText('Print')).toBeInTheDocument();
    expect(screen.getByText('Painting')).toBeInTheDocument();
  });

  it('should render no filter chips if none are passed', () => {
    render(<FilterChips filterOptions={undefined} />);
    expect(screen.queryByTestId('filter-chips')).not.toBeInTheDocument();
  });
});
