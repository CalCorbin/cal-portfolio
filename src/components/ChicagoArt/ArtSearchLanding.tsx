import SearchBar from './SearchBar';
import styles from './ArtSearchLanding.module.css';

const ArtSearchLanding = () => {
  return (
    <div className={styles.landingContainer}>
      <h1 className={styles.title}>Chicago Art Institute Explorer</h1>
      <SearchBar />
    </div>
  );
};

export default ArtSearchLanding;
