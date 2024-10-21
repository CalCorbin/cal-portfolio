import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('<Header />', () => {
  const initialProps = {
    title: 'Test Header',
    repoLink: 'https://banana.com',
    useDarkMode: false,
  };

  const prepareComponent = (props = initialProps) =>
    render(<Header {...props} />);

  afterEach(cleanup);

  it('should render title passed in', () => {
    prepareComponent();
    expect(screen.getByText(initialProps.title)).toBeInTheDocument();
  });

  it('should render link passed in', async () => {
    prepareComponent();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      initialProps.repoLink
    );
  });

  it('should render aria-label for link', async () => {
    prepareComponent();
    expect(screen.getByRole('link')).toHaveAttribute(
      'aria-label',
      `View the code for ${initialProps.title} on GitHub`
    );
  });

  it('should render the GitHub icon', async () => {
    prepareComponent();
    expect(screen.getByTestId('code-sample-link')).toBeInTheDocument();
  });

  it('should default to black text', async () => {
    prepareComponent();
    expect(screen.getByText(initialProps.title)).toHaveStyle('color: black');
  });

  it('should render white text when useDarkMode is true', async () => {
    prepareComponent({ ...initialProps, useDarkMode: true });
    expect(screen.getByText(initialProps.title)).toHaveStyle('color: white');
  });
});
