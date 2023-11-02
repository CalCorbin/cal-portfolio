import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from './Landing';

describe('<Landing />', () => {
  beforeEach(() => {
    render(<LandingPage />);
  });

  afterEach(cleanup);

  it('should render my name', () => {
    expect(screen.getByText('cal corbin')).toBeInTheDocument();
  });

  it('should render job title', () => {
    expect(screen.getByText('software engineer')).toBeInTheDocument();
  });

  it('should render header', () => {
    expect(screen.getByTestId('header-title')).toBeInTheDocument();
  });

  it('should render email link', () => {
    expect(screen.getByTestId('cal-email')).toBeInTheDocument();
  });

  it('should render github link', () => {
    expect(screen.getByTestId('cal-github')).toBeInTheDocument();
  });

  it('should render linkedin link', () => {
    expect(screen.getByTestId('cal-linkedin')).toBeInTheDocument();
  });

  it('should render a card', () => {
    expect(screen.getByTestId('card-link-1')).toBeInTheDocument();
  });
});
