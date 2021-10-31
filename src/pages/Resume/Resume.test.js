import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Landing from './index';

afterEach(cleanup);

it('should render resume page', () => {
  render(<Landing />);
  expect(screen.getByTestId('landing-container')).toBeInTheDocument();
});

it('should render about section', () => {
  render(<Landing />);
  expect(screen.getByTestId('about-section')).toBeInTheDocument();
});

it('should render technologies section', () => {
  render(<Landing />);
  expect(screen.getByTestId('technologies-section')).toBeInTheDocument();
});

it('should render experience section', () => {
  render(<Landing />);
  expect(screen.getByTestId('experience-section')).toBeInTheDocument();
});

it('should render education section', () => {
  render(<Landing />);
  expect(screen.getByTestId('education-section')).toBeInTheDocument();
});
