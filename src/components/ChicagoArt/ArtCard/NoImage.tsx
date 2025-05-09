import styles from './ArtCard.module.css';

type NoImageProps = {
  id: number;
  title?: string;
  artistTitle?: string | null;
};

const NoImage = ({ id, title, artistTitle }: NoImageProps) => {
  return (
    <div className={styles.art} data-testid="art-listing-no-image">
      <a href={`https://www.artic.edu/artworks/${id}/`}>
        <div className={styles.noImageContainer}>Image Not Available</div>
        <div className={styles.artOverlay}>
          <div
            className={styles.artTitle}
            data-testid="art-listing-title-no-image"
          >
            {title}
          </div>
          <div
            className={styles.artist}
            data-testid="art-listing-artist-no-image"
          >
            {artistTitle ? artistTitle : 'Artist Unknown'}
          </div>
        </div>
      </a>
    </div>
  );
};

export default NoImage;
