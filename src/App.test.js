import React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

afterEach(cleanup);
beforeEach(() => {
  render(<App />);
});

it('should render', () => {
  expect(screen.getByTestId('app-container')).toBeInTheDocument();
  expect(screen.getByTestId('landing-page')).toBeInTheDocument();
});

it('should open resume page', async () => {
  const resumeButton = screen.getByTestId('resume-button');

  await fireEvent.click(resumeButton);

  await waitFor(() => screen.getByTestId('resume-page'));
  expect(screen.getByTestId('resume-page')).toBeInTheDocument();
});
