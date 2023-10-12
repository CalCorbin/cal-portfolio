import styles from './Loading.module.css';

const Loading = () => (
  <div className={styles['loading-container']}>
    <div data-testid="loading-spinner" className={styles['loading-spinner']} />
  </div>
);

export default Loading;
