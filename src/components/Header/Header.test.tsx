import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

beforeEach(async () => {
  render(<Header title="Test Header" repoLink="https://banana.com" />);
});

afterEach(cleanup);

it('should render Header', () => {
  expect(screen.getByTestId('project-header')).toBeInTheDocument();
});
