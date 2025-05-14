import { useState } from 'react';
import styles from './Chip.module.css';
import { ChipProps } from '../../types/ChipProps';

const Chip = ({ label }: ChipProps) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
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
