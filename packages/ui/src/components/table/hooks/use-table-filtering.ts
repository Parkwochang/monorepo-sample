'use client';

import { useState, useMemo, useCallback } from 'react';
import { type ColumnFiltersState } from '@tanstack/react-table';
import type { FilterConfig } from '../types';

interface UseTableFilteringProps {
  filterConfig?: FilterConfig;
}

export const useTableFiltering = ({ filterConfig }: UseTableFilteringProps) => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // 필터링 설정 기본값
  const config = useMemo(
    () => ({
      enabled: false,
      placeholder: '검색...',
      enableColumnFilters: false,
      ...filterConfig,
    }),
    [filterConfig],
  );

  // 글로벌 필터 업데이트 (디바운스 적용)
  const updateGlobalFilter = useCallback((value: string) => {
    setGlobalFilter(value);
  }, []);

  // 컬럼 필터 업데이트
  const updateColumnFilter = useCallback((columnId: string, value: any) => {
    setColumnFilters((prev) => {
      const existingFilter = prev.find((f) => f.id === columnId);

      if (!value || (Array.isArray(value) && value.length === 0)) {
        // 필터 제거
        return prev.filter((f) => f.id !== columnId);
      }

      if (existingFilter) {
        // 기존 필터 업데이트
        return prev.map((f) => (f.id === columnId ? { ...f, value } : f));
      } else {
        // 새로운 필터 추가
        return [...prev, { id: columnId, value }];
      }
    });
  }, []);

  // 특정 컬럼 필터 값 가져오기
  const getColumnFilterValue = useCallback(
    (columnId: string): string => {
      const filter = columnFilters.find((f) => f.id === columnId);
      return (filter?.value as string) || '';
    },
    [columnFilters],
  );

  // 모든 필터 제거
  const clearAllFilters = useCallback(() => {
    setGlobalFilter('');
    setColumnFilters([]);
  }, []);

  // 활성 필터 개수
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (globalFilter) count++;
    count += columnFilters.length;
    return count;
  }, [globalFilter, columnFilters]);

  // 필터가 활성화되어 있는지 확인
  const hasActiveFilters = useMemo(() => {
    return activeFiltersCount > 0;
  }, [activeFiltersCount]);

  return {
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
    updateGlobalFilter,
    updateColumnFilter,
    getColumnFilterValue,
    clearAllFilters,
    activeFiltersCount,
    hasActiveFilters,
    config,
  };
};
