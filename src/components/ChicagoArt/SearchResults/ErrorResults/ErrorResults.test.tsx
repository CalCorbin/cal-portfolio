import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorResults from './ErrorResults';

const mockReload = jest.fn();
Object.defineProperty(window, 'location', {
  value: { reload: mockReload },
  writable: true,
});

describe('<ErrorResults />', () => {
  beforeEach(() => {
    mockReload.mockClear();
  });

  it('should render the error container', () => {
    render(<ErrorResults />);
    const errorContainer = screen
      .getByRole('heading', {
        name: /something went wrong/i,
      })
      .closest('div');

    expect(errorContainer).toHaveClass('errorContainer');
  });

  it('should display the error icon', () => {
    render(<ErrorResults />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should display the correct error title', () => {
    render(<ErrorResults />);
    const titleElement = screen.getByRole('heading', {
      name: /something went wrong/i,
    });

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('errorTitle');
  });

  it('should display the error message', () => {
    render(<ErrorResults />);
    const messageElement = screen.getByText(
      /we couldn't load the artwork results\. please try refreshing the page or try again later\./i
    );

    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('errorMessage');
  });

  it('should display a refresh button', () => {
    render(<ErrorResults />);
    const buttonElement = screen.getByRole('button', { name: /refresh page/i });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('errorButton');
  });

  it('should call window.location.reload when refresh button is clicked', () => {
    render(<ErrorResults />);
    const buttonElement = screen.getByRole('button', { name: /refresh page/i });

    fireEvent.click(buttonElement);

    expect(mockReload).toHaveBeenCalledTimes(1);
  });
});
