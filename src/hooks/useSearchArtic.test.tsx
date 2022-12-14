import { QueryClient, QueryClientProvider } from 'react-query';
// import { renderHook, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock';
import useSearchArtic from './useSearchArtic';
import API_URLS from '../constants/apiUrls';

describe('useSearchArtic', () => {
  const { ARTIC_BASE_PATH, ARTIC_ARTWORKS } = API_URLS;

  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: 0,
        },
      },
    });
    return function ({ children }: { children: React.ReactNode }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    };
  };

  const expectedResponse = [
    {
      title: 'The Actor Segawa Kikunojo III as a Woman of a Samurai Family',
      artist_title: 'Katsushika Hokusai',
      image_id: '123123',
    },
    {
      title: 'Peace Warrior (Samurai) 7',
      artist_title: 'Carl Chiarenza',
      image_id: '987987',
    },
  ];

  // Mock the fetch calls in the useSearchArtic hook
  fetchMock.post(`${ARTIC_BASE_PATH}${ARTIC_ARTWORKS}/search`, {
    status: 200,
    body: {
      data: [
        { score: 124, id: 123123 },
        { score: 987, id: 987987 },
      ],
    },
  });
  fetchMock.get(
    `${ARTIC_BASE_PATH}${ARTIC_ARTWORKS}?ids=123123,987987&fields=title,image_id,artist_title`,
    { status: 200, body: { data: expectedResponse } }
  );

  it('should return the correct data from useSearchArtic', async () => {
    const { result, waitFor } = renderHook(
      () => useSearchArtic('samurai', true),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(expectedResponse);
  });
});