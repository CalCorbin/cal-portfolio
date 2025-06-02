import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterChips from './FilterChips';
import useArtworkTypes from '../../../hooks/useArtworkTypes';

jest.mock('../../../hooks/useArtworkTypes');

describe('FilterChips', () => {
  const mockSetSelectedFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render filter chips from hook data', () => {
    (useArtworkTypes as jest.Mock).mockReturnValue({
      data: ['Print', 'Painting', 'Sculpture'],
    });

    render(
      <FilterChips
        selectedFilters={[]}
        setSelectedFilters={mockSetSelectedFilters}
      />
    );

    expect(screen.getByTestId('filter-chips')).toBeInTheDocument();

    // Assert that there are exactly 3 chips
    const chips = screen.getAllByTestId('chip');
    expect(chips).toHaveLength(3);
    expect(screen.getByText('Print')).toBeInTheDocument();
    expect(screen.getByText('Painting')).toBeInTheDocument();
    expect(screen.getByText('Sculpture')).toBeInTheDocument();
  });

  it('should render no filter chips if hook data is not available', () => {
    (useArtworkTypes as jest.Mock).mockReturnValue({
      data: null,
    });

    render(
      <FilterChips
        selectedFilters={[]}
        setSelectedFilters={mockSetSelectedFilters}
      />
    );

    expect(screen.queryByTestId('filter-chips')).not.toBeInTheDocument();
  });
});
