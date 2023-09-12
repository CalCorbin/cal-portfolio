import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Ship from './Ship';
import { IShip } from './ShipInterface';

const mockShip: IShip = {
  ship: {
    home_port: 'Port Canaveral',
    id: 'GOMSTREE',
    image: 'https://i.imgur.com/MtEgYbY.jpg',
    url: 'https://www.marinetraffic.com/en/ais/details/ships/shipid:3439091/vessel:MR%20STEVEN',
    name: 'GO Ms Tree',
    missions: [
      {
        flight: '50',
        name: 'KoreaSat 5A',
      },
      {
        flight: '58',
        name: 'Iridium NEXT Mission 5',
      },
    ],
    weight_lbs: 992000,
    active: true,
  },
};

describe('<Ship />', () => {
  afterEach(cleanup);

  it('should render', () => {
    render(<Ship ship={mockShip.ship} />);
    expect(screen.getByTestId('ship-GOMSTREE')).toBeInTheDocument();
  });

  it('should render weightless ship', () => {
    delete mockShip?.ship.weight_lbs;
    render(<Ship ship={mockShip.ship} />);
    expect(screen.getByText(/Unknown/)).toBeInTheDocument();
  });
});
