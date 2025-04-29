import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
  const initialProps = {
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
  };
  const prepareComponent = (props = initialProps) =>
    render(<SearchBar {...props} />);

  it('should enter a search term and click search', () => {
    prepareComponent();

    // Enter text in search bar
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'monet is an artist' } });

    // Find and click the search button to submit
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    expect(initialProps.handleSubmit).toHaveBeenCalled();
  });

  it('should enter a search term and press enter to search', () => {
    prepareComponent();

    // Enter text in search bar
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'monet is an artist' } });

    // Press Enter key to submit
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    expect(initialProps.handleSubmit).toHaveBeenCalled();
  });

  it('should enter a search term and pressing a random key does not trigger search', () => {
    prepareComponent();

    // Enter text in search bar
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'monet is an artist' } });

    // Press shift
    fireEvent.keyDown(searchInput, { key: 'shift', code: 'ShiftLeft' });
    expect(initialProps.handleSubmit).not.toHaveBeenCalled();
  });
});
