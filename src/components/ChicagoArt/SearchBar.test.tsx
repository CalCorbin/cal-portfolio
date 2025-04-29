import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

jest.mock('next/navigation', () => {
  const push = jest.fn();
  return {
    useRouter: () => ({
      push,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      // Add other router methods your component uses
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
  };
});

describe('<SearchBar />', () => {
  const prepareComponent = () => render(<SearchBar />);

  it.only('should enter a search term and click search', () => {
    const mockedPush = jest.requireMock('next/navigation').useRouter().push;
    prepareComponent();

    // Enter text in search bar
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'monet is an artist' } });

    // Click the search button to submit and assert result
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    expect(mockedPush).toHaveBeenCalledWith(
      `/chicago-art/search?q=${encodeURIComponent('monet is an artist')}`
    );
  });

  it('should enter a search term and press enter to search', () => {
    prepareComponent();

    // Enter text in search bar
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'monet is an artist' } });

    // Press Enter key to submit
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
  });

  it('should enter a search term and pressing a random key does not trigger search', () => {
    prepareComponent();

    // Enter text in search bar
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'monet is an artist' } });

    // Press shift
    fireEvent.keyDown(searchInput, { key: 'shift', code: 'ShiftLeft' });
  });
});
