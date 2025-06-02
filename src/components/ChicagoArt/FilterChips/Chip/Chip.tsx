import { useState } from 'react';
import styles from './Chip.module.css';
import { ChipProps } from '../../types/ChipProps';

const Chip = ({ label, selectedFilters, setSelectedFilters }: ChipProps) => {
  const [active, setActive] = useState(selectedFilters.includes(label));

  const handleClick = () => {
    setActive(!active);
    if (active) {
      setSelectedFilters((filters) =>
        filters.filter((filter) => filter !== label)
      );
    } else {
      setSelectedFilters((filters) => [...filters, label]);
    }
  };

  return (
    <button
      className={`${styles.chip} ${active ? styles.active : ''}`}
      onClick={handleClick}
      data-testid="chip"
      type="button"
    >
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default Chip;
