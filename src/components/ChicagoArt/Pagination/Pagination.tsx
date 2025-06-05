import React, { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageButton from './PageButton/PageButton';
import styles from './Pagination.module.css';

type PaginationProps = {
  page: number;
  pagination?: {
    total_pages: number;
    total: number;
  };
};

const Pagination = ({ page, pagination }: PaginationProps) => {
  if (!pagination) return null;
  if (pagination.total_pages <= 1) return null;

  const searchParams = useSearchParams();
  const router = useRouter();

  // Set a hard limit on pages due to the art API limits
  const totalPages = pagination.total_pages > 83 ? 83 : pagination.total_pages;

  const createPageHandler = useCallback(
    (targetPage: number) => () => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', targetPage.toString());
      router.push(`?${params.toString()}`);
    },
    [page, totalPages, searchParams, router]
  );

  const handlePrevPage = createPageHandler(page - 1);
  const handleNextPage = createPageHandler(page + 1);
  const handleFirstPage = createPageHandler(1);
  const handleLastPage = createPageHandler(totalPages);

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

        {page < totalPages && (
          <PageButton onClick={handleNextPage} key="next-page">
            {page + 1}
          </PageButton>
        )}

        {page < totalPages - 2 && <span className={styles.ellipsis}>...</span>}

        {page < totalPages - 1 && (
          <PageButton onClick={handleLastPage} key="last-page">
            {totalPages}
          </PageButton>
        )}

        <PageButton
          onClick={handleNextPage}
          disabled={page === totalPages}
          ariaLabel="Next page"
          isArrow
          key="next-arrow"
        >
          &rarr;
        </PageButton>
      </div>
      <div className={styles.paginationInfo}>
        Showing {page} of {totalPages} pages ({pagination.total} results)
      </div>
    </nav>
  );
};

export default Pagination;
