import { useSearchParams } from 'next/navigation';
import useSearchArtic from '../../../hooks/useSearchArtic';
import Loading from '../../Loading/Loading';
import ArtCard from '../ArtCard/ArtCard';
import { ArtProps } from '../types/ChicagoArtInterface';
import styles from './SearchResults.module.css';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: art, isLoading, isFetching, isError } = useSearchArtic(query);

  if (isError) return <div>Something went wrong</div>;

  return (
    <div data-testid="chicago-art">
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <div className={styles.resultContainer}>
          {art?.map((item: ArtProps) => (
            <ArtCard
              key={item?.image_id}
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

export default SearchResults;
