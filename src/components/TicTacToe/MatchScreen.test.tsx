import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatchScreen from './MatchScreen';

describe('MatchScreen', () => {
  const setup = () => render(<MatchScreen />);
  it('renders MatchScreen component', () => {
    setup();
    expect(screen.getByTestId('match-screen')).toBeInTheDocument();
  });
});
