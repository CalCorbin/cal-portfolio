import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Landing from './index';

afterEach(cleanup);

it('should render', () => {
  render(<Landing />);

  expect(screen.getByTestId('job-listing-1')).toBeInTheDocument();
});
