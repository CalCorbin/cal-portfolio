import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Resume from './index';

afterEach(cleanup);

it('should render resume page', () => {
  render(<Resume />);
  expect(screen.getByTestId('resume-page')).toBeInTheDocument();
});

it('should render about section', () => {
  render(<Resume />);
  expect(screen.getByTestId('about-section')).toBeInTheDocument();
});

it('should render technologies section', () => {
  render(<Resume />);
  expect(screen.getByTestId('technologies-section')).toBeInTheDocument();
});

it('should render experience section', () => {
  render(<Resume />);
  expect(screen.getByTestId('experience-section')).toBeInTheDocument();
});

it('should render education section', () => {
  render(<Resume />);
  expect(screen.getByTestId('education-section')).toBeInTheDocument();
});
