import SearchBar from './SearchBar/SearchBar';
import styles from './ArtSearchLanding.module.css';

const ArtSearchLanding = () => {
  return (
    <div className={styles.pageBackground}>
      <div className={styles.landingContainer}>
        <h1 className={styles.title}>Chicago Art Institute Explorer</h1>
        <SearchBar />
      </div>
    </div>
  );
};

export default ArtSearchLanding;
