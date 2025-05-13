import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useArtworkSearch from './useArtworkSearch';
import API_URLS from '../constants/apiUrls';
import { mockArtworkResponse, mockCollectionsResponse } from './testData';

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
  const { ARTIC_BASE_PATH, ARTIC_ARTWORKS } = API_URLS;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches artwork data with the provided search term', async () => {
    (fetch as jest.Mock).mockImplementation((url, options) => {
      if (url.includes('/search')) {
        // Check that the search term is correctly passed in the request body
        const requestBody = JSON.parse(options.body);
        expect(requestBody.q).toBe('monet');

        return Promise.resolve({
          json: () => Promise.resolve(mockCollectionsResponse),
        });
      } else {
        // Check that the IDs are correctly included in the URL
        expect(url).toContain('ids=1,2,3,4,5,6,7,8,9,10,11,12');
        expect(url).toContain(
          'fields=id,title,image_id,artist_title,thumbnail,artist_id'
        );

        return Promise.resolve({
          json: () => Promise.resolve(mockArtworkResponse),
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

    // Verify artwork and pagination results
    const mockResultData = {
      ...mockArtworkResponse,
      pagination: mockCollectionsResponse.pagination,
    };
    expect(result.current.data).toEqual(mockResultData);

    // Verify fetch was called twice with the correct arguments
    expect(fetch).toHaveBeenCalledTimes(2);

    // Assert first call is to search for artwork
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
          page: 1,
        }),
      })
    );

    // Assert second call to retrieve metadata about artworks
    const secondCallArgs = (fetch as jest.Mock).mock.calls[1];
    expect(secondCallArgs[0]).toBe(
      `${ARTIC_BASE_PATH}${ARTIC_ARTWORKS}?ids=1,2,3,4,5,6,7,8,9,10,11,12&fields=id,title,image_id,artist_title,thumbnail,artist_id,artwork_type`
    );
  });

  it('should handle no results from initial collections search', async () => {
    (fetch as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve({ data: [], pagination: null }),
      });
    });

    const { result } = renderHook(() => useArtworkSearch('super mario 64'), {
      wrapper: createWrapper(),
    });

    // Assert fetch was only called once because no collections data was returned.
    expect(fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toStrictEqual({ data: [], pagination: null });
    });
  });

  it('returns error state when the API request fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    const { result } = renderHook(() => useArtworkSearch('error-test'), {
      wrapper: createWrapper(),
    });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
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
