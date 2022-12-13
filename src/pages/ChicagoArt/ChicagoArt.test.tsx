import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChicagoArt from './ChicagoArt';
import useSearchArtic from '../../hooks/useSearchArtic';

const mockedUseSearchArtic = useSearchArtic as jest.Mock;
jest.mock('../../hooks/useSearchArtic');

interface MockedArt {
  title: string;
  image_id: string;
  artist_title?: string;
}
interface MockedQueryResults {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  data: Array<MockedArt>;
}

const mockedArt: Array<MockedArt> = [
  {
    title: 'Library Ladder',
    artist_title: 'William France',
    image_id: '7f0c1692-cd8a-ca14-e70a-b8252f55c453',
  },
  {
    title: 'Landscape at Cagnes',
    artist_title: 'Chaim Soutine',
    image_id: '7b3b8278-694a-f990-76e8-984573b36997',
  },
  {
    title: 'Brieve, France',
    image_id: '2276c90e-c3f6-2a94-1f95-2d19521d4282',
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

  it('should render art', () => {
    setup({
      data: mockedArt,
      isLoading: false,
      isFetching: false,
      isError: false,
    });
    expect(screen.getByText(/Library Ladder/)).toBeInTheDocument();
    expect(screen.getByText(/By William France/)).toBeInTheDocument();
  });

  it('should render art without artist name', () => {
    setup({
      data: mockedArt,
      isLoading: false,
      isFetching: false,
      isError: false,
    });
    expect(screen.getByText(/Brieve, France/)).toBeInTheDocument();
    expect(screen.getByText(/Artist Unknown/)).toBeInTheDocument();
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
