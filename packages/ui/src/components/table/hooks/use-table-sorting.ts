'use client';

import { useState, useMemo } from 'react';
import { type SortingState } from '@tanstack/react-table';
import type { SortingConfig } from '../types';

interface UseTableSortingProps {
  sortingConfig?: SortingConfig;
}

export const useTableSorting = ({ sortingConfig }: UseTableSortingProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  // 정렬 설정 기본값
  const config = useMemo(
    () => ({
      enabled: false,
      enableMultiSort: false,
      enableSortingRemoval: true,
      ...sortingConfig,
    }),
    [sortingConfig],
  );

  // 정렬 상태 토글
  const toggleSort = (columnId: string) => {
    if (!config.enabled) return;

    setSorting((prev) => {
      const existingSort = prev.find((s) => s.id === columnId);

      if (!existingSort) {
        // 새로운 정렬 추가
        const newSort = { id: columnId, desc: false };
        return config.enableMultiSort ? [...prev, newSort] : [newSort];
      }

      if (!existingSort.desc) {
        // asc -> desc
        return prev.map((s) => (s.id === columnId ? { ...s, desc: true } : s));
      }

      // desc -> remove (또는 asc로 돌아가기)
      if (config.enableSortingRemoval) {
        return prev.filter((s) => s.id !== columnId);
      } else {
        return prev.map((s) => (s.id === columnId ? { ...s, desc: false } : s));
      }
    });
  };

  // 정렬 상태 가져오기
  const getSortDirection = (columnId: string): 'asc' | 'desc' | false => {
    const sort = sorting.find((s) => s.id === columnId);
    if (!sort) return false;
    return sort.desc ? 'desc' : 'asc';
  };

  // 정렬 우선순위 가져오기 (다중 정렬용)
  const getSortPriority = (columnId: string): number | undefined => {
    if (!config.enableMultiSort) return undefined;
    return sorting.findIndex((s) => s.id === columnId) + 1 || undefined;
  };

  // 모든 정렬 제거
  const clearSorting = () => {
    setSorting([]);
  };

  return {
    sorting,
    setSorting,
    toggleSort,
    getSortDirection,
    getSortPriority,
    clearSorting,
    config,
  };
};
