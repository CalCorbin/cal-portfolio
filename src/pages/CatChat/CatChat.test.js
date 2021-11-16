import React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CatChat from './index';

beforeEach(async () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  render(<CatChat />);
});

afterEach(cleanup);

it('should render Cat Chat page', () => {
  expect(screen.getByTestId('cat-chat-page')).toBeInTheDocument();
});

it('should render disabled send button', () => {
  expect(screen.getByTestId('send-button')).toBeDisabled();
});

it('should enable send button', () => {
  const input = screen.getByTestId('chat-input');
  fireEvent.change(input, { target: { value: 'hello' } });
  expect(screen.getByTestId('send-button')).toBeEnabled();
});

it('should render empty chat state', () => {
  expect(screen.getByText(/Say something to the cat.../)).toBeInTheDocument();
});

it('should send a chat message', async () => {
  const input = screen.getByTestId('chat-input');
  const sendButton = screen.getByTestId('send-button');

  fireEvent.change(input, { target: { value: 'hello cat' } });
  fireEvent.click(sendButton);

  await waitFor(() => screen.getByTestId('You-0'));

  expect(screen.getByText(/Sent by You at/)).toBeInTheDocument();
});

it('should receive a chat message', async () => {
  const input = screen.getByTestId('chat-input');
  const sendButton = screen.getByTestId('send-button');

  fireEvent.change(input, { target: { value: 'hello cat' } });
  fireEvent.click(sendButton);

  await waitFor(() => screen.getByTestId('Cat-1'), { timeout: 3000 });
});
