import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoResults from './NoResults';

describe('NoResults', () => {
  it('should render', () => {
    render(<NoResults />);

    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(
      screen.getByText('Try adjusting your search terms')
    ).toBeInTheDocument();
  });
});
