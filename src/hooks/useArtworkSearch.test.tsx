import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useArtworkSearch from './useArtworkSearch';
import API_URLS from '../constants/apiUrls';
import React from 'react';

// Mock the global fetch function
global.fetch = jest.fn();

// Create a wrapper for the query client
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function TestQueryClientProviderWrapper({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe('useArtworkSearch hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches artwork data with the provided search term', async () => {
    const { ARTIC_BASE_PATH, ARTIC_ARTWORKS } = API_URLS;
    const mockCollectionData = {
      data: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
    const mockImageData = {
      data: [
        {
          id: 1,
          title: 'Artwork 1',
          image_id: 'img1',
          artist_title: 'Artist 1',
          thumbnail: 'thumb1',
          artist_id: 'aid1',
        },
        {
          id: 2,
          title: 'Artwork 2',
          image_id: 'img2',
          artist_title: 'Artist 2',
          thumbnail: 'thumb2',
          artist_id: 'aid2',
        },
        {
          id: 3,
          title: 'Artwork 3',
          image_id: 'img3',
          artist_title: 'Artist 3',
          thumbnail: 'thumb3',
          artist_id: 'aid3',
        },
      ],
    };

    // Setup the fetch mocks
    (fetch as jest.Mock).mockImplementation((url, options) => {
      if (url.includes('/search')) {
        // Check that the search term is correctly passed in the request body
        const requestBody = JSON.parse(options.body);
        expect(requestBody.q).toBe('monet');

        return Promise.resolve({
          json: () => Promise.resolve(mockCollectionData),
        });
      } else {
        // Check that the IDs are correctly included in the URL
        expect(url).toContain('ids=1,2,3');
        expect(url).toContain(
          'fields=title,image_id,artist_title,thumbnail,artist_id'
        );

        return Promise.resolve({
          json: () => Promise.resolve(mockImageData),
        });
      }
    });

    // Render the hook with a search term
    const { result } = renderHook(() => useArtworkSearch('monet'), {
      wrapper: createWrapper(),
    });

    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Verify the hook returns the expected data
    expect(result.current.data).toEqual(mockImageData.data);

    // Verify fetch was called twice with the correct arguments
    expect(fetch).toHaveBeenCalledTimes(2);

    // Assert first call is to search for art
    expect(fetch).toHaveBeenNthCalledWith(
      1,
      `${ARTIC_BASE_PATH}${ARTIC_ARTWORKS}/search`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          q: 'monet',
          fields: 'id',
          limit: 12,
        }),
      })
    );

    // Assert second call to retrieve metadata about artworks
    const secondCallArgs = (fetch as jest.Mock).mock.calls[1];
    expect(secondCallArgs[0]).toBe(
      `${ARTIC_BASE_PATH}${ARTIC_ARTWORKS}?ids=1,2,3&fields=title,image_id,artist_title,thumbnail,artist_id`
    );
  });

  it('returns error state when the API request fails', async () => {
    // Mock fetch to reject
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    // Render the hook
    const { result } = renderHook(() => useArtworkSearch('error-test'), {
      wrapper: createWrapper(),
    });

    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should not enable query if search term is empty', async () => {
    const { result } = renderHook(() => useArtworkSearch(''), {
      wrapper: createWrapper(),
    });

    // Verify that the query is not enabled (not in a loading state)
    expect(result.current.isLoading).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
    expect(result.current.fetchStatus).toBe('idle');
    expect(result.current.data).toBeUndefined();
  });
});
