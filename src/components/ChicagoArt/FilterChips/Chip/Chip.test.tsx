import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chip from './Chip';

describe('<Chip/>', () => {
  const mockSetSelectedFilters = jest.fn();
  it('renders chip as inactive when not included in selected filters', () => {
    render(
      <Chip
        label="Polish Sausage"
        selectedFilters={[]}
        setSelectedFilters={mockSetSelectedFilters}
      />
    );

    const chip = screen.getByTestId('chip');
    expect(chip).toBeInTheDocument();
    expect(chip).not.toHaveClass('active');
  });

  it('renders chip as active when not included in selected filters', () => {
    render(
      <Chip
        label="Polish Sausage"
        selectedFilters={['Polish Sausage']}
        setSelectedFilters={mockSetSelectedFilters}
      />
    );
    const chip = screen.getByTestId('chip');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass('active');
  });

  it('should call setSelectedFilters to add its label when clicked', () => {
    // Setup
    render(
      <Chip
        label="Polish Sausage"
        selectedFilters={[]}
        setSelectedFilters={mockSetSelectedFilters}
      />
    );

    // Action
    const chip = screen.getByTestId('chip');
    fireEvent.click(chip);

    // Assertion - verify the callback was called with a function
    expect(mockSetSelectedFilters).toHaveBeenCalled();

    // Extract and test the callback function's behavior
    const updateFunction = mockSetSelectedFilters.mock.calls[0][0];

    // Test with a simulated previous state
    const previousState: string[] = [];
    const newState = updateFunction(previousState);

    // Verify it adds the chip's label to the state
    expect(newState).toEqual(['Polish Sausage']);
  });

  it('should call setSelectedFilters to remove its label when clicked', () => {
    render(
      <Chip
        label="Polish Sausage"
        selectedFilters={['Polish Sausage']}
        setSelectedFilters={mockSetSelectedFilters}
      />
    );

    const chip = screen.getByTestId('chip');
    fireEvent.click(chip);

    expect(mockSetSelectedFilters).toHaveBeenCalled();

    const updateFunction = mockSetSelectedFilters.mock.calls[0][0];

    // Test with a simulated previous state
    const previousState = ['Polish Sausage'];
    const newState = updateFunction(previousState);

    expect(newState).toEqual([]);
  });
});
