import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useSearchArtic from '../../hooks/useSearchArtic';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading';
import ArtCard from './ArtCard';
import { ArtProps } from './ChicagoArtInterface';
import './ChicagoArt.css';

const ChicagoArt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [enableSearch, setEnableSearch] = useState(false);

  const {
    data: art,
    isLoading,
    isFetching,
    isError,
  } = useSearchArtic(searchTerm, enableSearch);

  /**
   * @description - This function is used to handle the search input. The search query
   * hook is disabled until the user clicks the search button.
   * @param e - React.ChangeEvent<HTMLInputElement>
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (enableSearch) setEnableSearch(false);
    setSearchTerm(e.target.value);
  };

  /**
   * @description - This function is used to handle the search button click. Clicking
   * the search button enables the search query hook.
   * @param e - React.MouseEvent<HTMLButtonElement>
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnableSearch(true);
  };

  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="art-page" data-testid="chicago-art">
      <div className="header-container">
        <img
          src="https://www.artic.edu/iiif/2/3c27b499-af56-f0d5-93b5-a7f2f1ad5813/full/843,/0/default.jpg"
          alt="water lily pond"
          className="header-image"
        />
        <div className="header-overlay" />
        <div className="search-container">
          <Header
            repoLink="https://github.com/CalCorbin/cal-portfolio/blob/master/src/pages/ChicagoArt/ChicagoArt.tsx"
            title="Art Search"
            useDarkMode
          />
          <p>
            Enter a search term below and explore thousands of images from the
            digital collection of the Art Institute of Chicago.
          </p>
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <form onSubmit={handleSubmit} className="search-form">
              <input
                id="search"
                type="text"
                data-testid="search-input"
                name="search"
                placeholder="Search artworks"
                aria-label="Enter a search term"
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
      </div>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <div className="result-container">
          {art?.map((item: ArtProps) => (
            <ArtCard
              key={item.image_id}
              title={item.title}
              artist_title={item.artist_title}
              artist_id={item.artist_id}
              image_id={item.image_id}
              thumbnail={item?.thumbnail}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChicagoArt;
