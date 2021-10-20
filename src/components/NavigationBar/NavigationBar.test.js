import React from 'react';
import { cleanup, render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavigationBar from './index';

afterEach(cleanup);

it('should render the navigation bar', () => {
  const { getByTestId } = render(<NavigationBar />);
  expect(getByTestId('navigation-bar')).toHaveClass('__navigation-bar');
});

it('should render the about button', () => {
  render(<NavigationBar />);

  const aboutButton = screen.getByTestId('about-button');

  fireEvent.click(aboutButton);

  expect(aboutButton).toHaveTextContent('ABOUT');
  expect(aboutButton).toBeEnabled();
});

it('should render the resume button', () => {
  render(<NavigationBar />);

  const resumeButton = screen.getByTestId('resume-button');

  fireEvent.click(resumeButton);

  expect(resumeButton).toHaveTextContent('RESUME');
  expect(resumeButton).toBeEnabled();
});
