import Chip from './Chip/Chip';
import styles from './FilterChips.module.css';

const FilterChips = () => {
  // TODO - Dynamically fetch this from artic API
  const FILTERS = [
    'Drawing and Watercolor',
    'Print',
    'Vessel',
    'Ceramics',
    'Painting',
    'Photograph',
    'Textile',
    'Sculpture',
  ];

  return (
    <div className={styles.chipContainer} data-testid="filter-chips">
      {FILTERS.map((filter) => {
        return <Chip key={filter} label={filter} />;
      })}
    </div>
  );
};

export default FilterChips;
