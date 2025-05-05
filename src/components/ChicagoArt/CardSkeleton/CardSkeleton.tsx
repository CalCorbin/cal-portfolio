import styles from './CardSkeleton.module.css';

const LoadingSkeleton = () => {
  return Array(12)
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className={styles.skeletonCard}
        data-testid="card-skeleton"
      >
        <div className={styles.skeletonImage}></div>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonArtist}></div>
      </div>
    ));
};

export default LoadingSkeleton;
