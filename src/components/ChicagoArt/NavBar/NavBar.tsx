import styles from './NavBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.homeButton}>
        <FontAwesomeIcon
          icon={faHome}
          className={styles.homeIcon}
          data-testid="home-icon"
        />
      </Link>
      <SearchBar />
    </nav>
  );
};

export default NavBar;
