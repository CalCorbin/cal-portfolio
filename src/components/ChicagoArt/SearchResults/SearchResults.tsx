import { useSearchParams } from 'next/navigation';
import ArtCard from '../ArtCard/ArtCard';
import NavBar from '../NavBar/NavBar';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import NoResults from './NoResults/NoResults';
import Pagination from '../Pagination/Pagination';
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

  if (isError) return <div>Something went wrong</div>;

  return (
    <div data-testid="chicago-art">
      <NavBar />
      <div className={styles.resultContainer}>
        {isLoading || isFetching ? (
          <CardSkeleton />
        ) : art.length ? (
          art.map((item: ArtProps) => (
            <ArtCard
              key={item?.image_id}
              title={item.title}
              artist_title={item.artist_title}
              artist_id={item.artist_id}
              image_id={item.image_id}
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
