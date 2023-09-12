import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

beforeEach(() => {
  render(<Card data={mockCard} />);
});
afterEach(cleanup);

const mockCard = {
  id: 1,
  title: 'Star Trek Next Generation Elevator Game',
  link: 'https://github.com/CalCorbin/elevatorGame',
  img: 'https://images.unsplash.com/photo-1550479023-2a811e19dfd3',
};

it('should render', () => {
  expect(screen.getByTestId('card-1')).toBeInTheDocument();
});

it('should render title', () => {
  expect(screen.getByText(mockCard.title)).toBeInTheDocument();
});

it('should render image', () => {
  expect(screen.getByTestId('card-image-1')).toBeInTheDocument();
});

it('should render link', async () => {
  expect(screen.getByRole('link')).toHaveAttribute('href', mockCard.link);
});
