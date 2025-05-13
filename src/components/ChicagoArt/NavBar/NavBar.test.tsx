import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from './NavBar';

jest.mock('next/navigation', () => {
  const push = jest.fn();
  return {
    useRouter: () => ({
      push,
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
});
