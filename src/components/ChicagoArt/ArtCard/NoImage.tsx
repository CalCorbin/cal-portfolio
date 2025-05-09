import styles from './ArtCard.module.css';

type NoImageProps = {
  title?: string;
  artistId?: number;
  artistTitle?: string;
};

const NoImage = ({ title, artistId, artistTitle }: NoImageProps) => {
  return (
    <div className={styles.art} data-testid="art-listing-no-image">
      <div className={styles.noImageContainer}>Image Not Available</div>
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
};

export default NoImage;
