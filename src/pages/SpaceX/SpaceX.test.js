import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceX from './index';

afterEach(cleanup);

it('should render spacex page', () => {
  render(<SpaceX />);
  expect(screen.getByTestId('spacex-page')).toBeInTheDocument();
});
