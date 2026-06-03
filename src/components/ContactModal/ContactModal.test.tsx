import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactModal from './ContactModal';

describe('<ContactModal />', () => {
  beforeEach(() => {
    render(<ContactModal />);
  });

  afterEach(cleanup);

  it('renders the sticky button', () => {
    expect(screen.getByLabelText('Open contact form')).toBeInTheDocument();
  });

  it('opens the modal when the sticky button is clicked', () => {
    fireEvent.click(screen.getByLabelText('Open contact form'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText("let's talk")).toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', () => {
    fireEvent.click(screen.getByLabelText('Open contact form'));
    fireEvent.click(screen.getByLabelText('Close contact form'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the modal when clicking the backdrop', () => {
    fireEvent.click(screen.getByLabelText('Open contact form'));
    fireEvent.click(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not close the modal when clicking inside it', () => {
    fireEvent.click(screen.getByLabelText('Open contact form'));
    fireEvent.click(screen.getByRole('dialog').querySelector('h2')!);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders form fields when modal is open', () => {
    fireEvent.click(screen.getByLabelText('Open contact form'));
    expect(screen.getByLabelText('name')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('message')).toBeInTheDocument();
    expect(screen.getByText('send')).toBeInTheDocument();
  });

  it('shows success message after successful submission', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    fireEvent.click(screen.getByLabelText('Open contact form'));
    fireEvent.change(screen.getByLabelText('name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('message'), { target: { value: 'Hello!' } });
    fireEvent.submit(screen.getByRole('dialog').querySelector('form')!);

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
  });

  it('shows error message when fetch throws a network error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    fireEvent.click(screen.getByLabelText('Open contact form'));
    fireEvent.change(screen.getByLabelText('name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('message'), { target: { value: 'Hello!' } });
    fireEvent.submit(screen.getByRole('dialog').querySelector('form')!);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('shows error message after failed submission', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });

    fireEvent.click(screen.getByLabelText('Open contact form'));
    fireEvent.change(screen.getByLabelText('name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('message'), { target: { value: 'Hello!' } });
    fireEvent.submit(screen.getByRole('dialog').querySelector('form')!);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
