import Loading from '../Loading/Loading';
import styles from './MatchScreen.module.css';

const MatchScreen = () => (
  <div className={styles['match-screen']} data-testid="match-screen">
    <div>Finding an opponent...</div>
    <Loading />
  </div>
);

export default MatchScreen;
