import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoImage from './NoImage';

describe('<NoImage/>', () => {
  it('should render with artist name', () => {
    render(<NoImage id={421} title="The Hobbit" artistTitle="Tolkien" />);

    expect(screen.getByText('Image Not Available')).toBeInTheDocument();
    expect(screen.getByText('The Hobbit')).toBeInTheDocument();
    expect(screen.getByText('Tolkien')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://www.artic.edu/artworks/421/'
    );
  });

  it('should render without artist name', () => {
    render(<NoImage id={421} title="The Hobbit" artistTitle={null} />);

    expect(screen.getByText('Image Not Available')).toBeInTheDocument();
    expect(screen.getByText('The Hobbit')).toBeInTheDocument();
    expect(screen.getByText('Artist Unknown')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://www.artic.edu/artworks/421/'
    );
  });
});
