import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useArtworkTypes from './useArtworkTypes';
import { mockArtworkTypesResponse } from './testData';

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

describe('useArtworkTypes hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches artwork data with the provided search term', async () => {
    (fetch as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockArtworkTypesResponse),
      });
    });

    const { result } = renderHook(() => useArtworkTypes(), {
      wrapper: createWrapper(),
    });

    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const mockResultData = [
      'Painting',
      'Vessel',
      'Basketry',
      'Miniature room',
      'Model',
      'Architectural fragment',
      'Print',
      'Performance Arts',
      'Installation',
      'Mixed Media',
      'Drawing and Watercolor',
      'Costume and Accessories',
    ];
    expect(result.current.data).toEqual(mockResultData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenNthCalledWith(
      1,
      'https://api.artic.edu/api/v1/artwork-types?fields=title'
    );
  });
});
