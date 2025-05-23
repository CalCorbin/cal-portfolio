import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HexClock from './HexClock';

describe('<HexClock />', () => {
  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ name: { value: 'exotic banana' } }),
      })
    );

    console.error = jest.fn();

    render(<HexClock />);
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  beforeEach(() => fetch.mockClear());

  afterEach(cleanup);

  it('should render color name', async () => {
    expect(screen.getByTestId('hexclock-page')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(/exotic banana/)).toBeInTheDocument()
    );
  });
});

describe('Testing time with zeros', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ name: { value: 'exotic banana' } }),
      })
    );

    jest.useFakeTimers().setSystemTime(new Date('2022-03-25T07:01:01Z'));

    render(<HexClock />);
  });

  it('should render time display using zeroes', () => {
    jest.useFakeTimers().setSystemTime(new Date('2022-03-25T07:01:01Z'));
    expect(screen.getByTestId('time-display')).toBeInTheDocument();
    expect(screen.getAllByText(/:01:01/)[0]).toBeInTheDocument();
  });
});

describe('Testing time with double digits', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ name: { value: 'exotic banana' } }),
      })
    );

    jest.useFakeTimers().setSystemTime(new Date('2022-03-25T01:20:20Z'));

    render(<HexClock />);
  });

  it('should render time display using double digit values', () => {
    expect(screen.getByTestId('time-display')).toBeInTheDocument();
    expect(screen.getAllByText(/:20:20/)[0]).toBeInTheDocument();
  });
});
