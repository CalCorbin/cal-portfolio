import Chip from './Chip/Chip';
import styles from './FilterChips.module.css';
import { FilterChipsProps } from '../types/FilterChipsProps';
import useArtworkTypes from '../../../hooks/useArtworkTypes';

const FilterChips = ({
  selectedFilters,
  setSelectedFilters,
}: FilterChipsProps) => {
  const { data: filterOptions } = useArtworkTypes();

  if (!filterOptions) return null;

  return (
    <div className={styles.chipContainer} data-testid="filter-chips">
      {filterOptions.map((filter: string) => {
        return (
          <Chip
            key={filter}
            label={filter}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        );
      })}
    </div>
  );
};

export default FilterChips;
