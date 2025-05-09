import { ArtProps } from '../types/ChicagoArtInterface';
import styles from './ArtCard.module.css';

const ArtCard = ({
  title,
  artist_title: artistTitle,
  artist_id: artistId,
  image_id: imageId,
  thumbnail,
}: ArtProps) => {
  if (!imageId) {
    return (
      <div className={styles.art} data-testid="art-listing-no-image">
        <div className={styles.noImageContainer}>Artwork Image Available</div>
        <div className={styles.artOverlay}>
          <div
            className={styles.artTitle}
            data-testid="art-listing-title-no-image"
          >
            {title}
          </div>
          <a
            href={`https://www.artic.edu/artists/${artistId}/`}
            className={styles.artist}
            target="_blank"
            rel="noreferrer"
            data-testid="art-listing-artist-no-image"
          >
            {artistTitle}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.art} data-testid={`art-listing-${imageId}`}>
      <img
        src={`https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`}
        alt={thumbnail?.alt_text || title}
      />
      <div className={styles.artOverlay}>
        <div
          className={styles.artTitle}
          data-testid={`art-listing-title-${imageId}`}
        >
          {title}
        </div>
        {artistTitle ? (
          <a
            href={`https://www.artic.edu/artists/${artistId}/`}
            className={styles.artist}
            target="_blank"
            rel="noreferrer"
            data-testid={`art-listing-artist-${imageId}`}
          >
            {artistTitle}
          </a>
        ) : (
          <div
            className={styles.artistUnknown}
            style={{ cursor: 'default' }}
            data-testid={`artist-unknown-${imageId}`}
          >
            Artist Unknown
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtCard;
