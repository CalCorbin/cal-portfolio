import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArtCard from './ArtCard';
import { ArtProps } from '../types/ArticApi';

describe('<ArtCard/>', () => {
  const mockedArt: ArtProps = {
    id: 21,
    title: 'Library Ladder',
    artist_title: 'William France',
    artist_id: 1,
    image_id: '1234',
    thumbnail: {
      lqip: 'blingblong',
      width: 400,
      height: 400,
      alt_text: 'The ladder inside Full Circle',
    },
    artwork_type_title: 'Painting',
  };

  const setup = (props: ArtProps = mockedArt) => {
    render(<ArtCard {...props} />);
  };

  it('should render link, alt text, title, artwork type, and artist name', async () => {
    setup();

    // Assert link and alt text
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://www.artic.edu/artworks/21/'
    );
    expect(
      screen.getByAltText(/The ladder inside Full Circle/)
    ).toBeInTheDocument();

    // Assert title, artwork type, and artist name
    fireEvent.mouseOver(screen.getByTestId('art-listing-1234'));
    await waitFor(() => {
      screen.getByTestId('art-listing-title-1234');
    });
    expect(screen.getByText(/Library Ladder/)).toBeInTheDocument();
    expect(screen.getByText('Painting | William France')).toBeInTheDocument();
  });

  it('should render alt text', async () => {
    setup();
  });

  it('should not render artwork type if no artwork type is provided', async () => {
    setup({ ...mockedArt, artwork_type_title: '' });

    fireEvent.mouseOver(screen.getByTestId('art-listing-1234'));
    await waitFor(() => {
      screen.getByTestId('art-listing-artist-1234');
    });
    expect(screen.queryByText('Painting')).not.toBeInTheDocument();
  });

  it('should fallback to art title for fallback text if alt_text is not available', async () => {
    setup({
      ...mockedArt,
      thumbnail: { lqip: 'blingblong', width: 400, height: 400 },
    });
    expect(screen.getByAltText(/Library Ladder/)).toBeInTheDocument();
  });

  it('should render unknown artist when artist is not found', async () => {
    setup({ ...mockedArt, artist_title: null });
    fireEvent.mouseOver(screen.getByTestId('art-listing-1234'));
    await waitFor(() => {
      screen.getByTestId('art-listing-title-1234');
    });
    expect(screen.getByText(/Artist Unknown/)).toBeInTheDocument();
  });

  it('should render empty image card if no image is provided', async () => {
    setup({
      ...mockedArt,
      image_id: null,
      thumbnail: null,
    });

    expect(screen.getByText(/Image Not Available/));
    fireEvent.mouseOver(screen.getByTestId('art-listing-no-image'));
    await waitFor(() => {
      screen.getByTestId('art-listing-no-image');
    });
    expect(screen.getByText(/Library Ladder/)).toBeInTheDocument();
    expect(screen.getByText(/William France/)).toBeInTheDocument();

    // Assert link exists
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute(
      'href',
      'https://www.artic.edu/artworks/21/'
    );
  });

  it('should render empty image card for unknown artist if no image is provided', async () => {
    setup({
      ...mockedArt,
      image_id: null,
      thumbnail: null,
      artist_title: null,
    });

    expect(screen.getByText(/Image Not Available/));
    fireEvent.mouseOver(screen.getByTestId('art-listing-no-image'));
    await waitFor(() => {
      screen.getByTestId('art-listing-no-image');
    });

    // Assert artwork and unknown artist
    expect(screen.getByText(/Artist Unknown/)).toBeInTheDocument();
    expect(screen.getByText(/Library Ladder/)).toBeInTheDocument();

    // Assert link exists
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute(
      'href',
      'https://www.artic.edu/artworks/21/'
    );
  });
});
