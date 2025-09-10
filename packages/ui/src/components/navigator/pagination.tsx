'use client';

import { usePagination } from '@workspace/ui/hooks';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from '../shared';
import { Button } from '../button';

interface EllipsisPaginationProps {
  initialPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
}

export const EllipsisPagination = ({
  initialPage,
  totalPages,
  paginationItemsToDisplay = 5,
}: EllipsisPaginationProps) => {
  const {
    currentPage,
    pages,
    showLeftEllipsis,
    showRightEllipsis,
    pathname,
    searchParams,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
  } = usePagination({
    initialPage,
    totalPages,
    paginationItemsToDisplay,
  });

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={{
              query: { ...searchParams, pageNumber: currentPage - 1 },
            }}
            scroll={false}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            onClick={handlePreviousPage}
            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>

        {showLeftEllipsis && (
          <>
            <PaginationItem>
              <PaginationLink
                href={{
                  query: { ...searchParams, page: 1 },
                }}
                onClick={handlePageChange(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={{
                query: { ...searchParams, page: page },
              }}
              scroll={false}
              onClick={handlePageChange(page)}
              isActive={currentPage === page}
              className={currentPage === page ? 'bg-primary text-white hover:bg-primary hover:text-white' : ''}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showRightEllipsis && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={{
                  query: { ...searchParams, page: totalPages },
                }}
                onClick={handlePageChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href={{
              query: { ...searchParams, page: currentPage + 1 },
            }}
            aria-disabled={currentPage >= totalPages}
            scroll={false}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
            onClick={handleNextPage}
            className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
