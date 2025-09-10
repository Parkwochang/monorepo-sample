"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@workspace/ui/lib";
import { Table } from "./table.base";
import { TableHeaderComponent } from "./components/table-header";
import { TableBodyComponent } from "./components/table-body";
import { TableFilters } from "./components/table-filters";
import {
  useCellSelection,
  useKeyboardNavigation,
  useTableData,
  useTableSorting,
  useTableFiltering,
} from "./hooks";
import type {
  DataTableProps,
  VirtualizationConfig,
  TableEventHandlers,
} from "./types";

// ----------------------------------------------------------------------

// 기본 가상화 설정
const DEFAULT_VIRTUALIZATION: Required<VirtualizationConfig> = {
  rowHeight: 45,
  overscan: 10,
  height: 600,
};

export const JrTable = <TData,>({
  data,
  columns,
  renderItem,
  className,
  type = "page",
  virtualization = DEFAULT_VIRTUALIZATION,
  columnSizing = true,
  enableCellSelection = true,
  filtering,
  sorting,
}: DataTableProps<TData>) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // 가상화 설정 병합
  const mergedVirtualization = useMemo(
    () => ({
      ...DEFAULT_VIRTUALIZATION,
      ...virtualization,
    }),
    [virtualization],
  );

  // 정렬 관리
  const sortingHook = useTableSorting({ sortingConfig: sorting });
  const {
    sorting: sortingState,
    setSorting,
    toggleSort,
    getSortDirection,
    getSortPriority,
    config: sortingConfig,
  } = sortingHook;

  // 필터링 관리
  const filteringHook = useTableFiltering({ filterConfig: filtering });
  const {
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
    config: filterConfig,
  } = filteringHook;

  // 테이블 데이터 관리
  const { table, editableCellsState } = useTableData({
    data,
    columns,
    columnSizing,
    sorting: sortingState,
    onSortingChange: setSorting,
    globalFilter,
    onGlobalFilterChange: setGlobalFilter,
    columnFilters,
    onColumnFiltersChange: setColumnFilters,
    sortingConfig: sorting,
    filterConfig: filtering,
  });

  const { rows } = table.getRowModel();

  // 가상 스크롤 설정
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => mergedVirtualization.rowHeight,
    overscan: mergedVirtualization.overscan,
    scrollPaddingEnd: 60,
  });

  // 셀 선택 관리
  const cellSelection = useCellSelection(table, enableCellSelection);
  const {
    selection,
    cellRefs,
    handleCellMouseDown,
    handleCellMouseEnter,
    handleMouseUp,
    isCellSelected,
    setCellRef,
    calculateSelectedCells,
    setSelectionStart,
    setSelectionEnd,
    setSelectedCells,
  } = cellSelection;

  const keyboardNavigation = useKeyboardNavigation({
    table,
    selection,
    cellRefs,
    enableCellSelection,
    calculateSelectedCells,
    setSelectionStart,
    setSelectionEnd,
    setSelectedCells,
  });

  // 이벤트 핸들러 통합
  const eventHandlers: TableEventHandlers = useMemo(
    () => ({
      onCellMouseDown: handleCellMouseDown,
      onCellMouseEnter: handleCellMouseEnter,
      onMouseUp: handleMouseUp,
      onKeyDown: keyboardNavigation.handleKeyDown,
    }),
    [
      handleCellMouseDown,
      handleCellMouseEnter,
      handleMouseUp,
      keyboardNavigation.handleKeyDown,
    ],
  );

  // 전역 마우스 이벤트 리스너
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [/* handleMouseUp */]);

  const totalSize = rowVirtualizer.getTotalSize();
  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <div className="space-y-4">
      {type === "page" && <div className="p-2">{renderItem(table)}</div>}

      <div
        className={cn(
          "rounded-xl bg-white border border-slate-200",
          "flex flex-col overflow-hidden",
          className,
        )}
        style={{
          height: `${mergedVirtualization.height}px`,
          position: "relative",
        }}
        onMouseUp={eventHandlers.onMouseUp}
      >
        {/* 필터 UI */}
        <TableFilters
          globalFilter={globalFilter}
          onGlobalFilterChange={updateGlobalFilter}
          onClearFilters={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
          activeFiltersCount={activeFiltersCount}
          config={filterConfig}
        />

        {/* 단일 테이블 구조 - 헤더 sticky */}
        <div
          ref={tableContainerRef}
          className="flex-1 overflow-auto"
          style={{
            paddingBottom: "16px",
          }}
        >
          <Table className="w-full">
            <TableHeaderComponent
              table={table}
              eventHandlers={eventHandlers}
              isCellSelected={isCellSelected}
              setCellRef={setCellRef}
              sortingConfig={sortingConfig}
              filterConfig={filterConfig}
              onToggleSort={toggleSort}
              getSortDirection={getSortDirection}
              getSortPriority={getSortPriority}
              onColumnFilterChange={updateColumnFilter}
              getColumnFilterValue={getColumnFilterValue}
            />
            <TableBodyComponent
              columns={columns}
              rows={rows}
              virtualRows={virtualRows}
              totalSize={totalSize}
              virtualization={mergedVirtualization}
              eventHandlers={eventHandlers}
              isCellSelected={isCellSelected}
              setCellRef={setCellRef}
            />
          </Table>
        </div>
      </div>

      {type === "modal" && <div className="p-2">{renderItem(table)}</div>}
    </div>
  );
};
