import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useGarageSales from './useGarageSales';
import { mockGarageSalesResponse } from './testData';

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

describe('useGarageSales hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches all garage sales records with no params', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockGarageSalesResponse),
    });

    const { result } = renderHook(() => useGarageSales(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockGarageSalesResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/api/garage-sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
  });

  it('sends recordID in the request body', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockGarageSalesResponse),
    });

    const { result } = renderHook(() => useGarageSales({ recordID: 3 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(fetch).toHaveBeenCalledWith('/api/garage-sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recordID: 3 }),
    });
  });

  it('sends filter params in the request body', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockGarageSalesResponse),
    });

    const { result } = renderHook(
      () =>
        useGarageSales({
          filterField: 'Zipcode',
          filterType: 'equal',
          filterValue: '73102',
        }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(fetch).toHaveBeenCalledWith('/api/garage-sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filterField: 'Zipcode',
        filterType: 'equal',
        filterValue: '73102',
      }),
    });
  });

  it('returns error state when the API request fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    const { result } = renderHook(() => useGarageSales(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
