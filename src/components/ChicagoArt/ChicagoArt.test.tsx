import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChicagoArt from './ChicagoArt';
import useSearchArtic from '../../hooks/useSearchArtic';
import { ArtProps } from './ChicagoArtInterface';

const mockedUseSearchArtic = useSearchArtic as jest.Mock;
jest.mock('../../hooks/useSearchArtic');

interface MockedQueryResults {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  data: Array<ArtProps>;
}

const mockedArt: Array<ArtProps> = [
  {
    title: 'Library Ladder',
    artist_title: 'William France',
    artist_id: 1,
    image_id: '7f0c1692-cd8a-ca14-e70a-b8252f55c453',
    thumbnail: {
      lqip: 'blingblong',
      width: 400,
      height: 400,
      alt_text: 'A library ladder',
    },
  },
  {
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    artist_title: 'Chaim Soutine',
    image_id: '7b3b8278-694a-f990-76e8-984573b36997',
    artist_id: 2,
    thumbnail: {
      lqip: 'blingblong',
      width: 400,
      height: 400,
    },
  },
];

describe('<ChicagoArt />', () => {
  const queryClient = new QueryClient();
  const setup = (mockedQueryResults: MockedQueryResults) => {
    mockedUseSearchArtic.mockReturnValue(mockedQueryResults);
    render(
      <QueryClientProvider client={queryClient}>
        <ChicagoArt />
      </QueryClientProvider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading spinner when page is loading', async () => {
    setup({ data: [], isLoading: true, isFetching: false, isError: false });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should render loading spinner when page is fetching', () => {
    setup({ data: [], isLoading: true, isFetching: true, isError: false });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should enter text in the search bar and submit search', async () => {
    setup({
      data: mockedArt,
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    // Enter text in search bar
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'monet is an artist' } });

    // Find and click the search button to submit
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    // Verify the input value and submit again with a new value
    await waitFor(() => expect(searchInput).toHaveValue('monet is an artist'));
    fireEvent.change(searchInput, { target: { value: 'cal is an artist' } });

    // Click the search button again
    fireEvent.click(searchButton);
  });

  it('should render error state', () => {
    setup({
      data: [],
      isLoading: false,
      isFetching: false,
      isError: true,
    });
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });
});
