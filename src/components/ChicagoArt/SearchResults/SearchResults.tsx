import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ArtCard from '../ArtCard/ArtCard';
import NavBar from '../NavBar/NavBar';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import NoResults from './NoResults/NoResults';
import Pagination from '../Pagination/Pagination';
import ErrorResults from './ErrorResults/ErrorResults';
import FilterChips from '../FilterChips/FilterChips';
import useArtworkSearch from '../../../hooks/useArtworkSearch';
import { ArtProps } from '../types/ArticApi';
import styles from './SearchResults.module.css';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = Number(searchParams.get('page')) || 1;
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const router = useRouter();

  const { data, isLoading, isFetching, isError } = useArtworkSearch(
    query,
    page,
    selectedFilters
  );
  const art = data?.data ? data.data : [];
  const pagination = data?.pagination;

  useEffect(() => {
    if (page !== 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');

      // Navigate to page 1 of the new results
      router.push(`?${params.toString()}`);
    }
  }, [selectedFilters]);

  if (isError) return <ErrorResults />;

  return (
    <div data-testid="chicago-art">
      <NavBar />
      <FilterChips
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
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
              artwork_type_title={item.artwork_type_title}
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
