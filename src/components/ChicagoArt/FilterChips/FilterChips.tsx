import Chip from './Chip/Chip';
import styles from './FilterChips.module.css';
import { FilterChipsProps } from '../types/FilterChipsProps';

const FilterChips = ({ filterOptions }: FilterChipsProps) => {
  if (!filterOptions) return null;

  return (
    <div className={styles.chipContainer} data-testid="filter-chips">
      {filterOptions.map((filter) => {
        return <Chip key={filter} label={filter} />;
      })}
    </div>
  );
};

export default FilterChips;
