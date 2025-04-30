import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(
        `/chicago-art/search?q=${encodeURIComponent(searchTerm.trim())}`
      );
    }
  };

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
