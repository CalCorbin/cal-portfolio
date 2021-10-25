import React from 'react';
import { cleanup, render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavigationBar from './NavigationBar';

beforeEach(() => render(<NavigationBar />));
afterEach(cleanup);

it('should render the Navigation bar', () => {
  expect(screen.getByTestId('navigation-bar')).toBeInTheDocument();
});

it('should render the resume button', () => {
  const resumeButton = screen.getByTestId('resume-button');

  fireEvent.click(resumeButton);

  expect(resumeButton).toHaveTextContent('RESUME');
  expect(resumeButton).toBeEnabled();
});
