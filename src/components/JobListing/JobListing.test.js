import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JobListing from './index';

const mockJob = {
  id: 6,
  title: 'Software Engineer',
  org: 'iUNU',
  dates: 'July 2021 - Present',
  highlights: [
    'Designed, built, and released customer facing features for desktop and mobile using React, React Native, PostGresQL and Ruby on Rails',
    'Refactored legacy frontend reporting tools and added new features, resulting in delighted customers',
    'Created integration tests that mimicked user interaction, which reduced regressions significantly',
  ],
};

beforeEach(() => {
  render(<JobListing job={mockJob} />);
});
afterEach(cleanup);

it('should render', () => {
  expect(screen.getByTestId('job-listing-6')).toBeInTheDocument();
});

it('should render organization', () => {
  expect(screen.getByText(/iUNU/i)).toBeInTheDocument();
});

it('should render job title', () => {
  expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
});

it('should render job dates', () => {
  expect(screen.getByText(/July 2021 - Present/i)).toBeInTheDocument();
});

it('should render job highlights', () => {
  expect(
    screen.getByText(/Designed, built, and released customer facing features/i)
  ).toBeInTheDocument();
});
