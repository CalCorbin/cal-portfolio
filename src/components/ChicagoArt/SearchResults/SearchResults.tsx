import { useSearchParams } from 'next/navigation';
import ArtCard from '../ArtCard/ArtCard';
import NavBar from '../NavBar/NavBar';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import NoResults from './NoResults/NoResults';
import Pagination from '../Pagination/Pagination';
import ErrorResults from './ErrorResults/ErrorResults';
import useArtworkSearch from '../../../hooks/useArtworkSearch';
import { ArtProps } from '../types/ChicagoArtInterface';
import styles from './SearchResults.module.css';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading, isFetching, isError } = useArtworkSearch(
    query,
    page
  );
  const art = data?.data ? data.data : [];
  const pagination = data?.pagination;

  if (isError) return <ErrorResults />;

  return (
    <div data-testid="chicago-art">
      <NavBar />
      <div className={styles.resultContainer}>
        {isLoading || isFetching ? (
          <CardSkeleton />
        ) : art.length ? (
          art.map((item: ArtProps) => (
            <ArtCard
              key={item.id}
              id={item.id}
              title={item.title}
              artist_title={item.artist_title}
              artist_id={item.artist_id}
              image_id={item?.image_id}
              thumbnail={item?.thumbnail}
            />
          ))
        ) : (
          <NoResults />
        )}
      </div>
      <Pagination page={page} pagination={pagination} />
    </div>
  );
};

export default SearchResults;
