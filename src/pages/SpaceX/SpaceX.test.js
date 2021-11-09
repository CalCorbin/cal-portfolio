import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import SpaceX, { GET_SHIPS } from './index';

const mocks = [
  {
    request: {
      query: GET_SHIPS,
    },
    result: {
      data: {
        ships: [
          {
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
          {
            id: 'GOPURSUIT',
            name: 'GO Pursuit',
            home_port: 'Port Canaveral',
            image: 'https://i.imgur.com/5w1ZWre.jpg',
            url: 'https://www.marinetraffic.com/en/ais/details/ships/shipid:3439091/vessel:MR%20STEVEN',
            missions: [],
            weight_lbs: 123125,
            active: true,
          },
          {
            id: 'AMERICANSPIRIT',
            name: 'American Spirit',
            home_port: 'Port of Los Angeles',
            image: null,
            url: null,
            missions: [],
            weight_lbs: 356738,
            active: false,
          },
        ],
      },
    },
  },
];

beforeEach(async () => {
  render(
    <MockedProvider mocks={mocks}>
      <SpaceX />
    </MockedProvider>
  );

  await waitFor(() => screen.getByTestId('spacex-page'));
});

afterEach(cleanup);

it('should render spacex page', () => {
  expect(screen.getByTestId('spacex-page')).toBeInTheDocument();
  expect(screen.getByText(/SpaceX Ships/)).toBeInTheDocument();
});

it('should render three ships', () => {
  expect(screen.getByTestId('ship-GOMSTREE')).toBeInTheDocument();
  expect(screen.getByTestId('ship-GOPURSUIT')).toBeInTheDocument();
  expect(screen.getByTestId('ship-AMERICANSPIRIT')).toBeInTheDocument();
});

it('should render ship image', () => {
  expect(screen.getByTestId('ship-image-GOMSTREE')).toBeInTheDocument();
});

it('should render ship with no image', () => {
  expect(
    screen.getByTestId('ship-no-image-AMERICANSPIRIT')
  ).toBeInTheDocument();
});

it('should render ship name', () => {
  expect(screen.getByText(/GO Ms Tree/)).toBeInTheDocument();
});

it('should render ship home port', () => {
  expect(screen.getByText(/Port of Los Angeles/)).toBeInTheDocument();
});

it('should render ship url', () => {
  expect(screen.getByTestId('ship-url-GOPURSUIT')).toBeInTheDocument();
});

it('should render empty ship url', () => {
  expect(screen.getByTestId('no-url-AMERICANSPIRIT')).toBeInTheDocument();
});

it('should render ship active status', () => {
  expect(screen.getAllByText(/Active/).length).toBe(2);
});

it('should render ship inactive status', () => {
  expect(screen.getByText(/Inactive/)).toBeInTheDocument();
});

it('should render ship weight', () => {
  expect(screen.getByText(/356738 lbs/)).toBeInTheDocument();
});

xit('should render ship missions', () => {
  expect(screen.getByText(/Name: GO Mssfdasd Tree/)).toBeInTheDocument();
});
