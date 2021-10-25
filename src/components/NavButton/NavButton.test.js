import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavButton from './NavButton';

afterEach(cleanup);

it('should render the NavButton correctly', () => {
  render(<NavButton buttonText="testme" />);
  expect(screen.getByTestId('nav-button')).toBeInTheDocument();
});
