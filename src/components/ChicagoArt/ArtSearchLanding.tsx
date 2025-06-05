import SearchBar from './SearchBar/SearchBar';
import MetaDataTags from '../MetaDataTags/MetaDataTags';
import styles from './ArtSearchLanding.module.css';

const ArtSearchLanding = () => {
  return (
    <div className={styles.pageBackground}>
      <MetaDataTags
        title="Chicago Art Institute Explorer"
        description="Explore the Chicago Art Institute public collection data"
        image="https://images.pexels.com/photos/1563259/pexels-photo-1563259.jpeg"
        url="https://calcorbin.com/chicago-art"
      />
      <div className={styles.landingContainer}>
        <h1 className={styles.title}>Chicago Art Institute Explorer</h1>
        <SearchBar />
      </div>
    </div>
  );
};

export default ArtSearchLanding;
