import React from 'react';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './BackButton.module.css';

const BackButton = () => {
  return (
    <button
      className={styles.backButton}
      onClick={() => window.history.back()}
      aria-label="Go back"
    >
      <FontAwesomeIcon
        icon={faChevronLeft}
        style={{ color: 'white', paddingRight: '0.5rem' }}
      />
      Back
    </button>
  );
};

export default BackButton;
