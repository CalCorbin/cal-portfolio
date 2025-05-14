import { memo } from 'react';
import NoImage from './NoImage/NoImage';
import { ArtProps } from '../types/ArticApi';
import styles from './ArtCard.module.css';

const ARTWORK_BASE_URL = 'https://www.artic.edu/artworks';
const IMAGE_BASE_URL = 'https://www.artic.edu/iiif/2';

const ArtCard = ({
  id,
  title,
  artist_title: artistTitle,
  image_id: imageId,
  thumbnail,
}: ArtProps) => {
  if (!imageId)
    return <NoImage id={id} artistTitle={artistTitle} title={title} />;

  return (
    <div className={styles.art} data-testid={`art-listing-${imageId}`}>
      <a href={`${ARTWORK_BASE_URL}/${id}/`}>
        <img
          src={`${IMAGE_BASE_URL}/${imageId}/full/300,/0/default.jpg`}
          alt={thumbnail?.alt_text || title}
          loading="lazy"
        />
        <div className={styles.artOverlay}>
          <div
            className={styles.artTitle}
            data-testid={`art-listing-title-${imageId}`}
          >
            {title}
          </div>
          <div
            className={styles.artist}
            data-testid={`art-listing-artist-${imageId}`}
          >
            {artistTitle ? artistTitle : 'Artist Unknown'}
          </div>
        </div>
      </a>
    </div>
  );
};

export default memo(ArtCard);
