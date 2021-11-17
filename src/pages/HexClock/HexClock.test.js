import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HexClock from './index';

beforeEach(async () => {
  render(<HexClock />);
});

afterEach(cleanup);

it('should render HexClock page', () => {
  expect(screen.getByTestId('hexclock-page')).toBeInTheDocument();
});

it('should render time display', () => {
  expect(screen.getByTestId('time-display')).toBeInTheDocument();
});
