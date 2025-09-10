'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  type ColumnDef,
  type Table as TableType,
  type SortingState,
  type ColumnFiltersState,
  type OnChangeFn,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { FilterConfig, SortingConfig } from '../types';
import { smartFilter, numberFilter } from '../utils/filter-functions';

interface UseTableDataProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  columnSizing: boolean;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  globalFilter?: string;
  onGlobalFilterChange?: OnChangeFn<string>;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  sortingConfig?: SortingConfig;
  filterConfig?: FilterConfig;
}

export const useTableData = <TData>({
  data,
  columns,
  columnSizing,
  sorting,
  onSortingChange,
  globalFilter,
  onGlobalFilterChange,
  columnFilters,
  onColumnFiltersChange,
  sortingConfig,
  filterConfig,
}: UseTableDataProps<TData>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [rowData, setRowData] = useState<TData[]>(data);
  const editableCellsState = useRef<Map<string, (isEditing: boolean) => void>>(new Map());

  // 각 컬럼에 기본 너비 설정
  const columnsWithSizing = useMemo(() => {
    if (!columnSizing) return columns;

    return columns.map((column) => {
      if ('size' in column) return column;
      return {
        ...column,
        size: 150, // 기본 너비
      };
    });
  }, [columns, columnSizing]);

  // 테이블 메타 함수들
  const tableMeta = useMemo(
    () => ({
      addRow: (addRow?: TData) => {
        setRowData((prev) => {
          return addRow ? [...prev, addRow] : prev;
        });
      },
      deleteRow: (...delIdx: number[]) => {
        setRowData((prev) => {
          return prev.filter((_, idx) => !delIdx.includes(idx));
        });
      },
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setRowData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
      insertData: (data: TData[]) => {
        setRowData((prev) => [...prev, ...data]);
      },
      activateEditableInput: (rowIndex: number, colIndex: number) => {
        const key = `${rowIndex}-${colIndex}`;
        const setEditingState = editableCellsState.current.get(key);
        if (setEditingState) {
          setEditingState(true);
        }
      },
    }),
    [],
  );

  const table = useReactTable({
    data: rowData,
    columns: columnsWithSizing,
    enableRowSelection: true,
    // 정렬 설정
    enableSorting: sortingConfig?.enabled ?? false,
    enableMultiSort: sortingConfig?.enableMultiSort ?? false,
    enableSortingRemoval: sortingConfig?.enableSortingRemoval ?? true,
    // 필터링 설정
    enableGlobalFilter: filterConfig?.enabled ?? false,
    enableColumnFilters: filterConfig?.enableColumnFilters ?? false,
    // 커스텀 필터 함수 설정
    filterFns: {
      smart: smartFilter,
      number: numberFilter,
    },
    // Row Model
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // 상태 관리
    onRowSelectionChange: setRowSelection,
    onSortingChange,
    onGlobalFilterChange,
    onColumnFiltersChange,
    state: {
      rowSelection,
      sorting: sorting || [],
      globalFilter: globalFilter || '',
      columnFilters: columnFilters || [],
    },
    meta: tableMeta,
  });

  // 데이터 변경 시 상태 업데이트
  useEffect(() => {
    setRowData(data);
    table.toggleAllPageRowsSelected(false);
  }, [data, table]);

  return {
    table,
    editableCellsState,
    rowData,
    setRowData,
  };
};
