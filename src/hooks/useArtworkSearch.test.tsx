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
  const ids =
    '?ids=122232%2C2344%2C20392%2C154136%2C86421%2C8585%2C74065%2C182567%2C12380%2C23468%2C186425%2C9512';
  const fields =
    '&fields=id%2Ctitle%2Cimage_id%2Cartist_title%2Cthumbnail%2Cartist_id%2Cartwork_type_title';

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
        expect(url).toContain(ids);
        expect(url).toContain(fields);

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
      data: mockArtworkResponse.data,
      pagination: mockCollectionsResponse.pagination,
      filterOptions: [
        'Metalwork',
        'Painting',
        'Decorative Arts',
        'Textile',
        'Ceramics',
        'Vessel',
      ],
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
      `${ARTIC_BASE_PATH}${ARTIC_ARTWORKS}${ids}${fields}`
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
