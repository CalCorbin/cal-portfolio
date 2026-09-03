import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Card, { CardProps } from './Card';

describe('Card', () => {
  const initialProps: CardProps = {
    data: {
      id: 1,
      title: 'Star Trek Next Generation Elevator Game',
      link: 'https://github.com/CalCorbin/elevatorGame',
      img: 'https://images.unsplash.com/photo-1550479023-2a811e19dfd3',
      description: 'Ride an elevator in the Enterprise as much as you want',
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

  it('should not render description if user is not hovering over card', async () => {
    prepareComponent();
    expect(screen.getByTestId('card-overlay')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });

  it('should render description if user is hovering over card', async () => {
    const user = userEvent;
    prepareComponent();

    const card = screen.getByTestId('card-image-1');
    await user.hover(card);
    expect(screen.getByTestId('card-overlay')).toHaveAttribute(
      'aria-hidden',
      'false'
    );
  });
});
