import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchResults from './SearchResults';
import useArtworkSearch from '../../../hooks/useArtworkSearch';
import { ArtProps } from '../types/ChicagoArtInterface';

const mockedUseArtworkSearch = useArtworkSearch as jest.Mock;
jest.mock('../../../hooks/useArtworkSearch');

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

describe('<SearchResults />', () => {
  const queryClient = new QueryClient();
  const setup = (mockedQueryResults: MockedQueryResults) => {
    mockedUseArtworkSearch.mockReturnValue(mockedQueryResults);
    render(
      <QueryClientProvider client={queryClient}>
        <SearchResults />
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

  it('should render error state', () => {
    setup({
      data: [],
      isLoading: false,
      isFetching: false,
      isError: true,
    });
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });

  it('should render art cards', () => {
    setup({
      data: mockedArt,
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    mockedArt.forEach((art) => {
      expect(screen.getByText(art.title)).toBeInTheDocument();
      expect(
        screen.getByTestId(`art-listing-${art.image_id}`)
      ).toBeInTheDocument();
    });
  });
});
