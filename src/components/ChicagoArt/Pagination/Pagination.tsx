import React, { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageButton from './PageButton/PageButton';
import styles from './Pagination.module.css';

type PaginationProps = {
  page: number;
  pagination: {
    total_pages: number;
    total: number;
  };
};

const Pagination = ({ page, pagination }: PaginationProps) => {
  if (!pagination) return null;
  if (pagination.total_pages <= 1) return null;

  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageHandler = useCallback(
    (targetPage: number) => () => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', targetPage.toString());
      router.push(`?${params.toString()}`);
    },
    [page, pagination.total_pages, searchParams, router]
  );

  const handlePrevPage = createPageHandler(page - 1);
  const handleNextPage = createPageHandler(page + 1);
  const handleFirstPage = createPageHandler(1);
  const handleLastPage = createPageHandler(pagination.total_pages);

  return (
    <nav aria-label="pagination">
      <div className={styles.pagination} role="navigation" aria-label="pages">
        <PageButton
          onClick={handlePrevPage}
          disabled={page === 1}
          ariaLabel="Previous page"
          isArrow
          key="previous-arrow"
        >
          &larr;
        </PageButton>

        {page > 2 && (
          <PageButton onClick={handleFirstPage} key="first-page">
            1
          </PageButton>
        )}

        {page > 3 && <span className={styles.ellipsis}>...</span>}

        {page > 1 && (
          <PageButton onClick={handlePrevPage} key="previous-page">
            {page - 1}
          </PageButton>
        )}

        <PageButton isActive ariaCurrent="page" key="current-page">
          {page}
        </PageButton>

        {page < pagination.total_pages && (
          <PageButton onClick={handleNextPage} key="next-page">
            {page + 1}
          </PageButton>
        )}

        {page < pagination.total_pages - 2 && (
          <span className={styles.ellipsis}>...</span>
        )}

        {page < pagination.total_pages - 1 && (
          <PageButton onClick={handleLastPage} key="last-page">
            {pagination.total_pages}
          </PageButton>
        )}

        <PageButton
          onClick={handleNextPage}
          disabled={page === pagination.total_pages}
          ariaLabel="Next page"
          isArrow
          key="next-arrow"
        >
          &rarr;
        </PageButton>
      </div>
      <div className={styles.paginationInfo}>
        Showing {page} of {pagination.total_pages} pages ({pagination.total}{' '}
        results)
      </div>
    </nav>
  );
};

export default Pagination;
