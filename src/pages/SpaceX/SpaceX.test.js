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
            name: 'GO Ms Tree',
          },
          {
            id: 'GOPURSUIT',
            name: 'GO Pursuit',
            home_port: 'Port Canaveral',
            image: 'https://i.imgur.com/5w1ZWre.jpg',
          },
          {
            id: 'AMERICANSPIRIT',
            name: 'American Spirit',
            home_port: 'Port of Los Angeles',
            image: null,
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
  expect(screen.getByText(/Name: GO Ms Tree/)).toBeInTheDocument();
});

it('should render ship home port', () => {
  expect(
    screen.getByText(/Home Port: Port of Los Angeles/)
  ).toBeInTheDocument();
});
