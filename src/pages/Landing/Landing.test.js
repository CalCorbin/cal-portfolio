import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import LandingPage from './index';

beforeEach(() => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
});

afterEach(cleanup);

it('should render', () => {
  expect(screen.getByTestId('landing-page')).toBeInTheDocument();
});

it('should render header', () => {
  expect(screen.getByTestId('header-title')).toBeInTheDocument();
});

it('should render github link', () => {
  expect(screen.getByTestId('cal-github')).toBeInTheDocument();
});

it('should render linkedin link', () => {
  expect(screen.getByTestId('cal-linkedin')).toBeInTheDocument();
});

it('should render a card', () => {
  expect(screen.getByTestId('card-link-1')).toBeInTheDocument();
});
