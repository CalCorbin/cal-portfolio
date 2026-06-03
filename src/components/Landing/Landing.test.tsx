import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from './Landing';

describe('<Landing />', () => {
  beforeEach(() => {
    render(<LandingPage />);
  });

  afterEach(cleanup);
  it('should render all landing page elements', () => {
    // Personal information
    expect(screen.getByText('cal corbin')).toBeInTheDocument();
    expect(screen.getByText('senior software engineer')).toBeInTheDocument();

    // Header and sections
    expect(screen.getByTestId('header-title')).toBeInTheDocument();
    expect(screen.getByTestId('bio-section')).toBeInTheDocument();
    expect(screen.getByTestId('talks-section')).toBeInTheDocument();

    // Social links
    expect(screen.getByTestId('cal-email')).toBeInTheDocument();
    expect(screen.getByTestId('cal-github')).toBeInTheDocument();
    expect(screen.getByTestId('cal-linkedin')).toBeInTheDocument();
    expect(screen.getByTestId('cal-discord')).toBeInTheDocument();
  });
});
