import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterChips from './FilterChips';

describe('FilterChips', () => {
  it('should render successfully', () => {
    render(<FilterChips />);

    expect(screen.getByTestId('filter-chips')).toBeInTheDocument();
    expect(screen.getByText('Print')).toBeInTheDocument();
  });
});
