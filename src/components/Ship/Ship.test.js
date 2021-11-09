import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Ship from './index';

const ship = {
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
};

beforeEach(() => {
  render(<Ship ship={ship} />);
});
afterEach(cleanup);

it('should render', () => {
  // Most of this component is tested in ../pages/SpaceX/SpaceX.test.js
  expect(screen.getByTestId('ship-GOMSTREE')).toBeInTheDocument();
});
