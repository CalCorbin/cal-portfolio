import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

afterEach(cleanup);
beforeEach(() => {
  render(<App />);
});

it('should render', () => {
  expect(screen.getByTestId('app-container')).toBeInTheDocument();
  expect(screen.getByTestId('landing-page')).toBeInTheDocument();
});
