import React, { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './Pagination.module.css';

type PaginationProps = {
  page: number;
  pagination: {
    total_pages: number;
    total: number;
  } | null;
};

const Pagination = ({ page, pagination }: PaginationProps) => {
  if (!pagination || !pagination.total_pages) return null;
  if (pagination.total_pages <= 1) return null;

  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = useCallback(
    (newPage: number) => {
      // Tests are written for the ignored line below.
      /* istanbul ignore next */
      if (newPage < 1 || newPage > pagination.total_pages) return;

      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage.toString());
      router.push(`?${params.toString()}`);
    },
    [pagination.total_pages, searchParams, router]
  );

  const handlePrevPage = useCallback(
    () => handlePageChange(page - 1),
    [page, handlePageChange]
  );

  const handleNextPage = useCallback(
    () => handlePageChange(page + 1),
    [page, handlePageChange]
  );

  const handleFirstPage = useCallback(
    () => handlePageChange(1),
    [page, handlePageChange]
  );

  const handleLastPage = useCallback(
    () => handlePageChange(pagination.total_pages),
    [page, handlePageChange]
  );

  const FirstPageButton = () => {
    if (page > 2) {
      return (
        <button className={styles.pageButton} onClick={handleFirstPage}>
          1
        </button>
      );
    } else {
      return null;
    }
  };

  const Ellipsis = () => {
    return <span className={styles.ellipsis}>...</span>;
  };

  return (
    <nav aria-label="pagination">
      <div className={styles.pagination} role="navigation" aria-label="pages">
        <button
          className={`${styles.pageButton} ${styles.pageArrow}`}
          onClick={handlePrevPage}
          disabled={page === 1}
          aria-label="Previous page"
        >
          &larr;
        </button>
        <FirstPageButton />
        {page > 3 && <Ellipsis />}
        {/* Previous page if not first */}
        {page > 1 && (
          <button className={styles.pageButton} onClick={handlePrevPage}>
            {page - 1}
          </button>
        )}
        {/* Current page */}
        <button
          className={`${styles.pageButton} ${styles.activePage}`}
          aria-current="page"
        >
          {page}
        </button>
        {/* Next page if not last */}
        {page < pagination.total_pages && (
          <button className={styles.pageButton} onClick={handleNextPage}>
            {page + 1}
          </button>
        )}
        {page < pagination.total_pages - 2 && <Ellipsis />}
        {/* Last page */}
        {page < pagination.total_pages - 1 && (
          <button className={styles.pageButton} onClick={handleLastPage}>
            {pagination.total_pages}
          </button>
        )}
        <button
          className={`${styles.pageButton} ${styles.pageArrow}`}
          onClick={handleNextPage}
          disabled={page === pagination.total_pages}
          aria-label="Next page"
        >
          &rarr;
        </button>
      </div>
      <div className={styles.paginationInfo}>
        Showing {page} of {pagination.total_pages} pages ({pagination.total}{' '}
        results)
      </div>
    </nav>
  );
};

export default Pagination;
