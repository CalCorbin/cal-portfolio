import React, { useState } from 'react';
import useSearchArtic from '../../hooks/useSearchArtic';
import './ChicagoArt.css';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading';

interface ArtProps {
  title: string;
  image_id: string;
  artist_title: string;
}

interface HandleChange {
  (e: React.ChangeEvent<HTMLInputElement>): void;
}

const ChicagoArt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: art, isLoading } = useSearchArtic(searchTerm, !!searchTerm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const debounce = (func: HandleChange, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: [React.ChangeEvent<HTMLInputElement>]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedHandleChange = debounce(handleChange, 500);

  return (
    <div className="art-page" data-testid="chicago-art">
      <Header
        repoLink="https://github.com/CalCorbin/cal-portfolio/blob/master/src/pages/ChicagoArt/ChicagoArt.tsx"
        title="Art Search"
      />
      <input
        type="text"
        data-testid="search-input"
        id="search"
        name="search"
        placeholder="Search the Art Institute of Chicago Collection"
        onChange={debouncedHandleChange}
      />
      <div>
        {isLoading ? (
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
