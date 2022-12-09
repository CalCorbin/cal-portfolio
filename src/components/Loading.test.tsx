import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loading from './Loading';

describe('<Loading />', () => {
  it('should render', () => {
    render(<Loading />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
