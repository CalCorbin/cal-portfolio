import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorResults from './ErrorResults';

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

  it('should render a link to the search page with correct attributes', () => {
    render(<ErrorResults />);

    const linkElement = screen.getByRole('link', {
      name: /go to search page/i,
    });

    expect(linkElement).toHaveAttribute(
      'href',
      '/chicago-art/search?q=charcoal'
    );
  });
});
