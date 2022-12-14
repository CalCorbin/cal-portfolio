import React, { useState } from 'react';
import useSearchArtic from '../../hooks/useSearchArtic';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading';
import './ChicagoArt.css';

interface ArtProps {
  title: string;
  image_id: string;
  artist_title: string;
}

const ChicagoArt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [enableSearch, setEnableSearch] = useState(false);
  const {
    data: art,
    isLoading,
    isFetching,
    isError,
  } = useSearchArtic(searchTerm, enableSearch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (enableSearch) setEnableSearch(false);
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnableSearch(true);
  };

  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="art-page" data-testid="chicago-art">
      <div className="search-container">
        <Header
          repoLink="https://github.com/CalCorbin/cal-portfolio/blob/master/src/pages/ChicagoArt/ChicagoArt.tsx"
          title="Art Search"
          useDarkMode
        />
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            data-testid="search-input"
            id="search"
            name="search"
            placeholder="Enter a search term"
            aria-label="Enter a search term"
            onChange={handleChange}
          />
          <button
            type="submit"
            id="search-button"
            aria-label="Submit search term"
            data-testid="search-button"
          >
            Search
          </button>
        </form>
      </div>
      <div>
        {isLoading || isFetching ? (
          <Loading />
        ) : (
          <div className="art">
            {art?.map((item: ArtProps) => (
              <div
                key={item.image_id}
                className="art-listing"
                data-testid={`art-listing-${item.image_id}`}
              >
                <img
                  src={`https://www.artic.edu/iiif/2/${item.image_id}/full/400,/0/default.jpg`}
                  alt={item.title}
                />
                <div className="search-result">
                  <div>{item.title}</div>
                  <div>
                    {item.artist_title
                      ? `By ${item.artist_title}`
                      : 'Artist Unknown'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChicagoArt;
