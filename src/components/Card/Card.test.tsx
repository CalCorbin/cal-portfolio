import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card', () => {
  const initialProps = {
    data: {
      id: 1,
      title: 'Star Trek Next Generation Elevator Game',
      link: 'https://github.com/CalCorbin/elevatorGame',
      img: 'https://images.unsplash.com/photo-1550479023-2a811e19dfd3',
    },
  };

  const prepareComponent = (props = initialProps) =>
    render(<Card {...props} />);
  afterEach(cleanup);

  it('should render title', () => {
    prepareComponent();
    expect(screen.getByText(initialProps.data.title)).toBeInTheDocument();
  });

  it('should render image', () => {
    prepareComponent();
    expect(screen.getByTestId('card-image-1')).toBeInTheDocument();
  });

  it('should render link', async () => {
    prepareComponent();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      initialProps.data.link
    );
  });
});
