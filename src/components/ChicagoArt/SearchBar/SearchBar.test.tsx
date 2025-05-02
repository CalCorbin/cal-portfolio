import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar, { SEARCH_RESULTS_PATH } from './SearchBar';

jest.mock('next/navigation', () => {
  const push = jest.fn();
  return {
    useRouter: () => ({
      push,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
  };
});

describe('<SearchBar /> Input Behavior', () => {
  let mockedPush: jest.Mock;

  beforeEach(() => {
    mockedPush = jest.requireMock('next/navigation').useRouter().push;
    render(<SearchBar />);
  });

  afterEach(() => jest.clearAllMocks);

  it('should enter a search term and trigger a search', () => {
    // Enter text in search bar
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'monet is an artist' } });

    // Click the search button to submit and assert search was started
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    expect(mockedPush).toHaveBeenCalledWith(
      expect.stringContaining(
        `${SEARCH_RESULTS_PATH}?q=monet%20is%20an%20artist`
      )
    );
  });

  it('should not trigger search when search term is empty', () => {
    // Click the search button and assert no search was triggered
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    expect(mockedPush).not.toHaveBeenCalled();
  });

  it('should not trigger search by pressing a random key', () => {
    // Enter text in search bar
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'monet is an artist' } });

    // Press shift and assert no search was triggered
    fireEvent.keyDown(searchInput, { key: 'shift', code: 'ShiftLeft' });
    expect(mockedPush).not.toHaveBeenCalled();
  });

  it('should not trigger a search with bad text input', () => {
    // Enter space text in search bar
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: '      ' } });

    // Click the search button to submit and assert no search was triggered
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    expect(mockedPush).not.toHaveBeenCalled();
  });
});

describe('<SearchBar /> URL Parameter handling', () => {
  afterEach(() => jest.clearAllMocks());

  it('should show custom search path when provided', () => {
    const mockedPush = jest.requireMock('next/navigation').useRouter().push;
    jest.requireMock('next/navigation').useSearchParams = () =>
      new URLSearchParams('?q=test+query');
    render(<SearchBar searchPath="/hobbits/shire" />);

    // Check query and enter search
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveValue('test query');
    screen.getByTestId('search-button').click();

    // Check that url has been updated
    expect(mockedPush).toHaveBeenCalledWith(
      expect.stringContaining(`/hobbits/shire?q=test%20query`)
    );
  });

  it('should show search term from url in the input', () => {
    const mockedPush = jest.requireMock('next/navigation').useRouter().push;
    jest.requireMock('next/navigation').useSearchParams = () =>
      new URLSearchParams('?q=test+query');
    render(<SearchBar />);

    // Check query and enter search
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveValue('test query');
    screen.getByTestId('search-button').click();

    // Check that url has been updated
    expect(mockedPush).toHaveBeenCalledWith(
      expect.stringContaining(`${SEARCH_RESULTS_PATH}?q=test%20query`)
    );
  });

  it('should update search term when URL query parameter changes', () => {
    let mockParams = new URLSearchParams('?q=initial+query');
    jest.requireMock('next/navigation').useSearchParams = () => mockParams;

    // Render the component
    const { rerender } = render(<SearchBar />);

    // Check initial value
    expect(screen.getByTestId('search-input')).toHaveValue('initial query');

    // Update the URL parameters
    mockParams = new URLSearchParams('?q=updated+query');

    // Re-render the component to trigger the useEffect with new searchParams
    rerender(<SearchBar />);
    expect(screen.getByTestId('search-input')).toHaveValue('updated query');
  });

  it('should handle very long search terms correctly', () => {
    const mockedPush = jest.requireMock('next/navigation').useRouter().push;
    render(<SearchBar />);

    const veryLongTerm = 'a'.repeat(2000);
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: veryLongTerm } });
    fireEvent.click(screen.getByTestId('search-button'));

    expect(mockedPush).toHaveBeenCalledWith(
      expect.stringContaining(`${SEARCH_RESULTS_PATH}?q=${veryLongTerm}`)
    );
  });

  it('should handle special characters in search terms', () => {
    const mockedPush = jest.requireMock('next/navigation').useRouter().push;
    render(<SearchBar />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, {
      target: { value: '油画 & symbols %20 ?' },
    });
    fireEvent.click(screen.getByTestId('search-button'));

    expect(mockedPush).toHaveBeenCalled();

    expect(mockedPush).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent('油画 & symbols %20 ?'))
    );
  });

  it('should prevent default form submission and use router navigation instead', () => {
    const mockedPush = jest.requireMock('next/navigation').useRouter().push;
    render(<SearchBar />);

    // Assuming SearchBar renders a form element
    const form = screen.getByTestId('search-form');
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'test query' } });

    const submitEvent = createEvent.submit(form);
    submitEvent.preventDefault = jest.fn();
    fireEvent(form, submitEvent);

    expect(submitEvent.preventDefault).toHaveBeenCalled();
    expect(mockedPush).toHaveBeenCalled();
  });
});
