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
      hasBackButton: false,
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

  it('should render _self if hasBackButton is true', async () => {
    prepareComponent({
      data: { ...initialProps.data, hasBackButton: true },
    });
    expect(screen.getByRole('link')).toHaveAttribute('target', '_self');
  });

  it('should render _blank if hasBackButton is false', async () => {
    prepareComponent();
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });
});
