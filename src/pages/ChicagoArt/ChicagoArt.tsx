import React, { useState } from 'react';
import useSearchArtic from '../../hooks/useSearchArtic';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading';
import { ArtProps } from './ChicagoArtInterface';
import './ChicagoArt.css';

const Art = ({
  title,
  artist_title: artistTitle,
  artist_id: artistId,
  image_id: imageId,
  thumbnail,
}: ArtProps) => {
  const truncatedArtworkTitle =
    title.length > 60 ? `${title.slice(0, 60)}...` : title;
  return (
    <div key={imageId} className="art" data-testid={`art-listing-${imageId}`}>
      <img
        src={`https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`}
        alt={thumbnail.alt_text || title}
      />
      <div className="art-overlay">
        <div className="art-title" data-testid={`art-listing-title-${imageId}`}>
          {truncatedArtworkTitle}
        </div>
        {artistTitle ? (
          <a
            href={`https://www.artic.edu/artists/${artistId}/`}
            className="artist"
            target="_blank"
            rel="noreferrer"
            data-testid={`art-listing-artist-${imageId}`}
          >
            {artistTitle}
          </a>
        ) : (
          <div
            className="artist"
            style={{ cursor: 'default' }}
            data-testid={`artist-unknown-${imageId}`}
          >
            Artist Unknown
          </div>
        )}
      </div>
    </div>
  );
};
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
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <div className="result-container">
          {art?.map((item: ArtProps) => (
            <Art
              key={item.image_id}
              title={item.title}
              artist_title={item.artist_title}
              artist_id={item.artist_id}
              image_id={item.image_id}
              thumbnail={item.thumbnail}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChicagoArt;
