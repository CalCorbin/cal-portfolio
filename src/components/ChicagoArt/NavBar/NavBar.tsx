import SearchBar from '../SearchBar/SearchBar';
import styles from './NavBar.module.css';

interface NavBarProps {
  activeLink?: string;
}

const NavBar: React.FC<NavBarProps> = ({ activeLink }) => {
  return (
    <nav className={styles.navbar}>
      <SearchBar />
    </nav>
  );
};

export default NavBar;
