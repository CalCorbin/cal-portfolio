import { ArtProps } from './ChicagoArtInterface';

const ArtCard = ({
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
        <div
          className="art-title"
          data-testid={`art-listing-title-${imageId}`}
        >
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

export default ArtCard;