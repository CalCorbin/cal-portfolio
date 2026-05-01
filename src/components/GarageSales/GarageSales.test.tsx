import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GarageSales from './GarageSales';
import useGarageSales from '../../hooks/useGarageSales';
import { mockGarageSalesResponse } from '../../hooks/testData';

jest.mock('../../hooks/useGarageSales');
const mockedUseGarageSales = useGarageSales as jest.Mock;

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map">{children}</div>
  ),
  TileLayer: () => null,
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="marker">{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('leaflet', () => ({
  icon: jest.fn(() => ({})),
}));

describe('<GarageSales />', () => {
  it('user sees a loading indicator while garage sale data is fetching', () => {
    mockedUseGarageSales.mockReturnValue({ isLoading: true, isError: false });
    render(<GarageSales />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('user sees an error message when garage sale data fails to load', () => {
    mockedUseGarageSales.mockReturnValue({ isLoading: false, isError: true });
    render(<GarageSales />);
    expect(
      screen.getByText('Failed to load garage sale data.')
    ).toBeInTheDocument();
  });

  it('user sees the map when garage sale data loads', () => {
    mockedUseGarageSales.mockReturnValue({
      data: mockGarageSalesResponse,
      isLoading: false,
      isError: false,
    });
    render(<GarageSales />);
    expect(screen.getByText('OKC Garage Sales')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('user sees address, zipcode, and permit date for a sale', () => {
    mockedUseGarageSales.mockReturnValue({
      data: mockGarageSalesResponse,
      isLoading: false,
      isError: false,
    });
    render(<GarageSales />);
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText(/73102/)).toBeInTheDocument();
    expect(screen.getByText(/2024-06-01/)).toBeInTheDocument();
  });

  it('user sees item categories for a sale', () => {
    mockedUseGarageSales.mockReturnValue({
      data: mockGarageSalesResponse,
      isLoading: false,
      isError: false,
    });
    render(<GarageSales />);
    expect(
      screen.getByText(/Clothing, Furniture, Kitchen Items/)
    ).toBeInTheDocument();
  });

  it('user sees an empty map when the response contains no records', () => {
    mockedUseGarageSales.mockReturnValue({
      data: {},
      isLoading: false,
      isError: false,
    });
    render(<GarageSales />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.queryByTestId('marker')).not.toBeInTheDocument();
  });

  it('sales without a location are not shown on the map', () => {
    mockedUseGarageSales.mockReturnValue({
      data: {
        ...mockGarageSalesResponse,
        Records: [
          ...mockGarageSalesResponse.Records,
          ['2', '456 No Location Rd', '73101', '2024-06-01', 'No', 'No', 'No',
           'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', '', ''],
        ],
      },
      isLoading: false,
      isError: false,
    });
    render(<GarageSales />);
    expect(screen.getAllByTestId('marker')).toHaveLength(1);
    expect(screen.queryByText('456 No Location Rd')).not.toBeInTheDocument();
  });
});
