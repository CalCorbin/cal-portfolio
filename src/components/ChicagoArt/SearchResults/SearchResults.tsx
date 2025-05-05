import { useSearchParams } from 'next/navigation';
import useArtworkSearch from '../../../hooks/useArtworkSearch';
import ArtCard from '../ArtCard/ArtCard';
import { ArtProps } from '../types/ChicagoArtInterface';
import styles from './SearchResults.module.css';
import NavBar from '../NavBar/NavBar';
import CardSkeleton from '../CardSkeleton/CardSkeleton';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: art, isLoading, isFetching, isError } = useArtworkSearch(query);

  if (isError) return <div>Something went wrong</div>;

  return (
    <div data-testid="chicago-art">
      <NavBar />
      <div className={styles.resultContainer}>
        {isLoading || isFetching ? (
          <CardSkeleton />
        ) : (
          art?.map((item: ArtProps) => (
            <ArtCard
              key={item?.image_id}
              title={item.title}
              artist_title={item.artist_title}
              artist_id={item.artist_id}
              image_id={item.image_id}
              thumbnail={item?.thumbnail}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
