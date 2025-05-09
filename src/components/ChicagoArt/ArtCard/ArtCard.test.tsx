import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArtCard from './ArtCard';
import { ArtProps } from '../types/ChicagoArtInterface';

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
  };

  const setup = (props: ArtProps) => {
    const {
      id,
      title,
      artist_title: artistTitle,
      artist_id: artistId,
      image_id: imageId,
      thumbnail,
    } = props;
    render(
      <ArtCard
        id={id}
        title={title}
        artist_title={artistTitle}
        artist_id={artistId}
        image_id={imageId}
        thumbnail={thumbnail}
      />
    );
  };

  it('should render', async () => {
    setup(mockedArt);
    expect(screen.getByTestId('art-listing-1234')).toBeInTheDocument();
  });

  it('should render link', async () => {
    setup(mockedArt);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute(
      'href',
      'https://www.artic.edu/artworks/21/'
    );
  });

  it('should render title', async () => {
    setup(mockedArt);
    fireEvent.mouseOver(screen.getByTestId('art-listing-1234'));
    await waitFor(() => {
      screen.getByTestId('art-listing-title-1234');
    });
    expect(screen.getByText(/Library Ladder/)).toBeInTheDocument();
  });

  it('should render artist', async () => {
    setup(mockedArt);
    fireEvent.mouseOver(screen.getByTestId('art-listing-1234'));
    await waitFor(() => {
      screen.getByTestId('art-listing-artist-1234');
    });
    expect(screen.getByText(/William France/)).toBeInTheDocument();
  });

  it('should render alt text', async () => {
    setup(mockedArt);
    expect(
      screen.getByAltText(/The ladder inside Full Circle/)
    ).toBeInTheDocument();
  });

  it('should fallback to art title for fallback text if alt_text is not available', async () => {
    delete mockedArt?.thumbnail?.alt_text;
    setup(mockedArt);
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
