import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArtCard from './ArtCard';
import { ArtProps } from './ChicagoArtInterface';

describe('<ArtCard/>', () => {
  const mockedArt: ArtProps = {
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
      title,
      artist_title: artistTitle,
      artist_id: artistId,
      image_id: imageId,
      thumbnail,
    } = props;
    render(
      <ArtCard
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
    delete mockedArt.artist_title;
    setup(mockedArt);
    fireEvent.mouseOver(screen.getByTestId('art-listing-1234'));
    await waitFor(() => {
      screen.getByTestId('art-listing-title-1234');
    });
    expect(screen.getByText(/Artist Unknown/)).toBeInTheDocument();
    expect(screen.getByTestId('artist-unknown-1234')).toBeInTheDocument();
  });

  it('should not render if no imageId', async () => {
    delete mockedArt.image_id;
    setup(mockedArt);
    expect(screen.queryByTestId('art-listing-1234')).not.toBeInTheDocument();
  });
});
