import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from 'react-query';
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
  {
    title: 'Brieve, France',
    image_id: '2276c90e-c3f6-2a94-1f95-2d19521d4282',
    artist_id: 3,
    thumbnail: {
      lqip: 'blingblong',
      width: 400,
      height: 400,
      alt_text: 'France in the distance',
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

  it('should render art data on hover', async () => {
    setup({
      data: mockedArt,
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    fireEvent.mouseOver(
      screen.getByTestId('art-listing-7f0c1692-cd8a-ca14-e70a-b8252f55c453')
    );
    await waitFor(() => {
      screen.getByTestId(
        'art-listing-title-7f0c1692-cd8a-ca14-e70a-b8252f55c453'
      );
    });
    expect(screen.getByText(/Library Ladder/)).toBeInTheDocument();
    expect(screen.getByText(/William France/)).toBeInTheDocument();
  });

  it('should render art title that is long and truncated', async () => {
    setup({
      data: mockedArt,
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    fireEvent.mouseOver(
      screen.getByTestId('art-listing-7b3b8278-694a-f990-76e8-984573b36997')
    );
    await waitFor(() => {
      screen.getByTestId(
        'art-listing-title-7b3b8278-694a-f990-76e8-984573b36997'
      );
    });
    expect(
      screen.getByText(
        /Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.../
      )
    ).toBeInTheDocument();
  });

  it('should render art that falls back on art title for alt text', async () => {
    setup({
      data: mockedArt,
      isLoading: false,
      isFetching: false,
      isError: false,
    });
    expect(screen.getByAltText(mockedArt[1].title)).toBeInTheDocument();
  });

  it('should render unknown artist when artist is not found', async () => {
    setup({
      data: mockedArt,
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    fireEvent.mouseOver(
      screen.getByTestId('art-listing-2276c90e-c3f6-2a94-1f95-2d19521d4282')
    );
    await waitFor(() => {
      screen.getByTestId(
        'art-listing-title-2276c90e-c3f6-2a94-1f95-2d19521d4282'
      );
    });
    expect(screen.getByText(/Artist Unknown/)).toBeInTheDocument();
    expect(
      screen.getByTestId('artist-unknown-2276c90e-c3f6-2a94-1f95-2d19521d4282')
    ).toBeInTheDocument();
  });

  it('should enter text in the search bar and click search button', async () => {
    setup({
      data: mockedArt,
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    // Enter text in search bar
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');
    fireEvent.change(searchInput, { target: { value: 'monet is an artist' } });
    fireEvent.click(searchButton);

    // Update search term
    await waitFor(() => expect(searchInput).toHaveValue('monet is an artist'));
    fireEvent.change(searchInput, { target: { value: 'cal is an artist' } });
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
