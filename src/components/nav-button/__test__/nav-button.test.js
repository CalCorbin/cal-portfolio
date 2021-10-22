import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavButton from '../index';

afterEach(cleanup);

it('should render the nav-button correctly', () => {
  const { getByTestId } = render(<NavButton buttonText="testme" />);
  expect(getByTestId('nav-button')).toHaveClass('__button-container');
});
