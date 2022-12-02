import React, { useState } from 'react';
import useSearchArtic from '../../hooks/useSearchArctic';
import './ChicagoArt.css';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading';

interface ArtProps {
  title: string;
  image_id: string;
  artist_title: string;
}

const ChicagoArt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: art, isLoading } = useSearchArtic(searchTerm, !!searchTerm);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(e.currentTarget.search.value);
  };

  return (
    <div className="art-page">
      <Header
        repoLink="https://github.com/CalCorbin/cal-portfolio/blob/master/src/pages/ChicagoArt/ChicagoArt.tsx"
        title="Art Search"
      />
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search the Art Institute of Chicago Collection"
        />
      </form>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="art">
            {art?.map((item: ArtProps) => (
              <div key={item.image_id} className="art-listing">
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
