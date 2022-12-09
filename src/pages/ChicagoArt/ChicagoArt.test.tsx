import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChicagoArt from './ChicagoArt';

describe('<ChicagoArt />', () => {
  const queryClient = new QueryClient();

  it('should render', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChicagoArt />
      </QueryClientProvider>
    );
    expect(screen.getByTestId('chicago-art')).toBeInTheDocument();
  });

  it.skip('should render a list of art', async () => {
    // TODO - figure out how to mock react-query to return data
    render(
      <QueryClientProvider client={queryClient}>
        <ChicagoArt />
      </QueryClientProvider>
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'monet' } });
    await waitFor(() => screen.queryByTestId('loading-spinner'));
    await waitFor(() => screen.queryByTestId('art-listing-1'));
    expect(screen.getByTestId('art-listing-1')).toBeInTheDocument();
  });
});
