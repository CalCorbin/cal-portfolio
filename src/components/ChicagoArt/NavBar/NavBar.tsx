import SearchBar from '../SearchBar/SearchBar';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <SearchBar />
    </nav>
  );
};

export default NavBar;
