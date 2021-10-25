import React from 'react';
import { cleanup, render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavigationBar from './NavigationBar';

afterEach(cleanup);

it('should render the Navigation bar', () => {
  const { getByTestId } = render(<NavigationBar />);
  expect(getByTestId('Navigation-bar')).toHaveClass('__navigation-bar');
});

it('should render the resume button', () => {
  render(<NavigationBar />);

  const resumeButton = screen.getByTestId('resume-button');

  fireEvent.click(resumeButton);

  expect(resumeButton).toHaveTextContent('RESUME');
  expect(resumeButton).toBeEnabled();
});
