import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CatChat from './index';

beforeEach(async () => {
  render(<CatChat />);
});

afterEach(cleanup);

it('should render Cat Chat page', () => {
  expect(screen.getByTestId('cat-chat-page')).toBeInTheDocument();
});
