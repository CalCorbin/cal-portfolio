import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useArtworkSearch from './useArtworkSearch';
import { mockArtworkResponse, mockCollectionsResponse } from './testData';

global.fetch = jest.fn();

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
  const ids =
    '?ids=122232%2C2344%2C20392%2C154136%2C86421%2C8585%2C74065%2C182567%2C12380%2C23468%2C186425%2C9512';
  const fields =
    '&fields=id%2Ctitle%2Cimage_id%2Cartist_title%2Cthumbnail%2Cartist_id%2Cartwork_type_title';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches artwork data with the provided search term', async () => {
    (fetch as jest.Mock).mockImplementation((url) => {
      if (url.includes('/search')) {
        expect(url.includes('monet')).toBe(true);
        return Promise.resolve({
          json: () => Promise.resolve(mockCollectionsResponse),
        });
      } else {
        // Check that the IDs and fields are correctly included in the URL
        expect(url).toContain(ids);
        expect(url).toContain(fields);

        return Promise.resolve({
          json: () => Promise.resolve(mockArtworkResponse),
        });
      }
    });

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
    };
    expect(result.current.data).toEqual(mockResultData);

    // Verify fetch was called twice with the correct arguments
    expect(fetch).toHaveBeenCalledTimes(2);

    // Assert first call is to search for artwork
    expect(fetch).toHaveBeenNthCalledWith(
      1,
      'https://api.artic.edu/api/v1/artworks/search?params=%7B%22q%22%3A%22monet%22%2C%22fields%22%3A%5B%22id%22%5D%2C%22limit%22%3A12%2C%22page%22%3A1%7D'
    );

    // Assert second call to retrieve metadata about artworks
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://api.artic.edu/api/v1/artworks?ids=122232%2C2344%2C20392%2C154136%2C86421%2C8585%2C74065%2C182567%2C12380%2C23468%2C186425%2C9512&fields=id%2Ctitle%2Cimage_id%2Cartist_title%2Cthumbnail%2Cartist_id%2Cartwork_type_title'
    );
  });

  it('should fetch artwork data with search term and selected filters', async () => {
    (fetch as jest.Mock).mockImplementation((url) => {
      if (url.includes('/search')) {
        expect(url.includes('thunder')).toBe(true);
        expect(url.includes('Print')).toBe(true);
        return Promise.resolve({
          json: () => Promise.resolve(mockCollectionsResponse),
        });
      } else {
        // Check that the IDs and fields are correctly included in the URL
        expect(url).toContain(ids);
        expect(url).toContain(fields);

        return Promise.resolve({
          json: () => Promise.resolve(mockArtworkResponse),
        });
      }
    });

    const { result } = renderHook(
      () =>
        useArtworkSearch('thunder', 1, ['Print', 'Costume and Accessories']),
      {
        wrapper: createWrapper(),
      }
    );

    // Wait for query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Assert first call is to search for artwork
    expect(fetch).toHaveBeenNthCalledWith(
      1,
      'https://api.artic.edu/api/v1/artworks/search?params=%7B%22q%22%3A%22thunder%22%2C%22fields%22%3A%5B%22id%22%5D%2C%22limit%22%3A12%2C%22page%22%3A1%2C%22query%22%3A%7B%22bool%22%3A%7B%22should%22%3A%5B%7B%22match%22%3A%7B%22artwork_type_title%22%3A%22Print%22%7D%7D%2C%7B%22match%22%3A%7B%22artwork_type_title%22%3A%22Costume+and+Accessories%22%7D%7D%5D%2C%22minimum_should_match%22%3A1%7D%7D%7D'
    );

    // Assert second call to retrieve metadata about artworks
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://api.artic.edu/api/v1/artworks?ids=122232%2C2344%2C20392%2C154136%2C86421%2C8585%2C74065%2C182567%2C12380%2C23468%2C186425%2C9512&fields=id%2Ctitle%2Cimage_id%2Cartist_title%2Cthumbnail%2Cartist_id%2Cartwork_type_title'
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
