import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from './NavBar';

const mockPush = jest.fn();
jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
  };
});

describe('<NavBar/>', () => {
  it('should render with search input', () => {
    render(<NavBar />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });

  it('should have home link pointing to homepage', () => {
    render(<NavBar />);

    // Assert that the link has the correct href
    const homeLink = screen.getByTestId('home-icon').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
