import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorResults from './ErrorResults';

const mockHref = '/chicago-art/search?q=frodo';
Object.defineProperty(window, 'location', {
  value: { href: mockHref },
  writable: true,
});

describe('<ErrorResults />', () => {
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

  it('should take user to search page when search page button is clicked', () => {
    render(<ErrorResults />);

    // Assert original href
    expect(window.location.href).toContain(mockHref);

    // Click refresh button
    const buttonElement = screen.getByRole('button', {
      name: /Go to Search Page/i,
    });
    fireEvent.click(buttonElement);

    // Assert that href has been updated
    expect(window.location.href).toContain('/chicago-art/search?q=charcoal');
  });
});
