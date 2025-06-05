import styles from './ErrorResults.module.css';

const ErrorResults = () => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h3 className={styles.errorTitle}>Something went wrong</h3>
      <p className={styles.errorMessage}>
        We couldn&apos;t load the artwork results. Please try refreshing the
        page or try again later.
      </p>
      <button
        className={styles.errorButton}
        onClick={() =>
          (window.location.href = '/chicago-art/search?q=charcoal')
        }
      >
        Go to Search Page
      </button>
    </div>
  );
};

export default ErrorResults;
