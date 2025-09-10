'use client';

import { useState } from 'react';
import { calculatePaginationRange } from '../lib';
import { useCustomRouter } from './use-router';

interface UsePaginationProps {
  initialPage: number;
  totalPages: number;
  paginationItemsToDisplay: number;
}

export function usePagination({ initialPage, totalPages, paginationItemsToDisplay }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { pathname, query: searchParams } = useCustomRouter();

  const { pages, showLeftEllipsis, showRightEllipsis } = calculatePaginationRange({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });

  console.log('showRightEllipsis: ', showRightEllipsis);

  console.log(totalPages - currentPage + 1 > paginationItemsToDisplay / 2);

  const handlePageChange = (page: number) => () => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    setCurrentPage((pre) => Math.max(pre - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((pre) => Math.min(pre + 1, totalPages));
  };

  return {
    currentPage,
    pages,
    showLeftEllipsis,
    showRightEllipsis,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    pathname,
    searchParams,
  };
}
