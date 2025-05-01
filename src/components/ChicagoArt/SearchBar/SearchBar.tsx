import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBar.module.css';

export const SEARCH_RESULTS_PATH = '/chicago-art/search';

type SearchBarProps = {
  searchPath?: string;
};

const SearchBar = ({ searchPath = SEARCH_RESULTS_PATH }: SearchBarProps) => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) setSearchTerm(query);
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        router.push(`${searchPath}?q=${encodeURIComponent(searchTerm.trim())}`);
      }
    },
    [searchTerm, router]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.searchForm}
      data-testid="search-form"
    >
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      <input
        id="search"
        type="text"
        data-testid="search-input"
        name="search"
        placeholder="Search artworks"
        aria-label="Enter a search term"
        onChange={handleChange}
        value={searchTerm}
      />
      <button
        type="submit"
        data-testid="search-button"
        className={styles.searchButton}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
