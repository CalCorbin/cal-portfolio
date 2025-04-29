import styles from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type SearchBarProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ handleSubmit, handleChange }: SearchBarProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit(e);
  };

  return (
    <div className={styles.searchContainer}>
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      <form onSubmit={handleSubmit}>
        <input
          id="search"
          type="text"
          data-testid="search-input"
          name="search"
          placeholder="Search artworks"
          aria-label="Enter a search term"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          data-testid="search-button"
          className={styles.searchButton}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
