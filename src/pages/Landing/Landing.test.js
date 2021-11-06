import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Landing from './index';

afterEach(cleanup);

it('should render', () => {
  render(<Landing />);

  expect(screen.getByTestId('landing-page')).toBeInTheDocument();
});

it('should render header', () => {
  render(<Landing />);

  expect(screen.getByTestId('header-title')).toBeInTheDocument();
});

it('should render github link', () => {
  render(<Landing />);

  expect(screen.getByTestId('cal-github')).toBeInTheDocument();
});

it('should render linkedin link', () => {
  render(<Landing />);

  expect(screen.getByTestId('cal-linkedin')).toBeInTheDocument();
});

it('should render a card', () => {
  render(<Landing />);

  expect(screen.getByTestId('card-link-1')).toBeInTheDocument();
});
