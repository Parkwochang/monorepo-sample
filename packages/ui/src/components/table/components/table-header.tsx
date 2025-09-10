import React from "react";
import { flexRender, type Table as TableType } from "@tanstack/react-table";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@workspace/ui/lib";
import { TableHeader, TableHead, TableRow } from "../table.base";
import { ColumnFilter } from "./column-filter";
import type { TableEventHandlers, SortingConfig, FilterConfig } from "../types";

interface TableHeaderComponentProps<TData> {
  table: TableType<TData>;
  eventHandlers: TableEventHandlers;
  isCellSelected: (rowIndex: number, colIndex: number) => boolean;
  setCellRef: (
    element: HTMLElement | null,
    rowIndex: number,
    colIndex: number,
  ) => void;
  sortingConfig?: Required<SortingConfig>;
  filterConfig?: Required<FilterConfig>;
  onToggleSort?: (columnId: string) => void;
  getSortDirection?: (columnId: string) => "asc" | "desc" | false;
  getSortPriority?: (columnId: string) => number | undefined;
  onColumnFilterChange?: (columnId: string, value: string) => void;
  getColumnFilterValue?: (columnId: string) => string;
}

export const TableHeaderComponent = <TData,>({
  table,
  eventHandlers,
  isCellSelected,
  setCellRef,
  sortingConfig,
  filterConfig,
  onToggleSort,
  getSortDirection,
  getSortPriority,
  onColumnFilterChange,
  getColumnFilterValue,
}: TableHeaderComponentProps<TData>) => {
  const { onCellMouseDown, onCellMouseEnter, onKeyDown } = eventHandlers;

  // 정렬 아이콘 렌더링
  const renderSortIcon = (columnId: string, canSort: boolean) => {
    if (!sortingConfig?.enabled || !getSortDirection || !canSort) return null;

    const sortDirection = getSortDirection(columnId);
    const priority = getSortPriority?.(columnId);

    return (
      <div className="ml-2 flex items-center gap-1">
        {sortDirection === "asc" && (
          <ChevronUp className="h-4 w-4 text-blue-600" />
        )}
        {sortDirection === "desc" && (
          <ChevronDown className="h-4 w-4 text-blue-600" />
        )}
        {sortDirection === false && (
          <ChevronsUpDown className="h-4 w-4 text-slate-400" />
        )}
        {priority && sortingConfig.enableMultiSort && (
          <span className="text-xs font-semibold text-white bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
            {priority}
          </span>
        )}
      </div>
    );
  };

  return (
    <TableHeader className="sticky top-0 z-10 bg-white">
      {table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
        <React.Fragment key={headerGroup.id}>
          {/* 헤더 제목 행 */}
          <TableRow className="whitespace-nowrap">
            {headerGroup.headers.map((header, colIndex) => {
              const canSort =
                header.column.getCanSort() && sortingConfig?.enabled;

              const columnWidth = header.column.getSize();

              return (
                <TableHead
                  key={header.id}
                  className={cn(
                    "text-center select-none",
                    isCellSelected(0, colIndex) && "bg-blue-100",
                    canSort &&
                      "cursor-pointer hover:bg-gray-50 transition-colors",
                  )}
                  colSpan={header.colSpan}
                  ref={(el) => setCellRef(el, 0, colIndex)}
                  onKeyDown={(e) => onKeyDown(e, 0, colIndex)}
                  onMouseDown={(e) => onCellMouseDown(e, 0, colIndex)}
                  onMouseEnter={() => onCellMouseEnter(0, colIndex)}
                  onClick={() => {
                    if (canSort && onToggleSort) {
                      onToggleSort(header.column.id);
                    }
                  }}
                  tabIndex={0}
                  style={{
                    width: `${columnWidth}px`,
                    minWidth: `${columnWidth}px`,
                    maxWidth: `${columnWidth}px`,
                  }}
                >
                  <div className="flex items-center justify-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {renderSortIcon(header.column.id, !!canSort)}
                  </div>
                </TableHead>
              );
            })}
          </TableRow>

          {/* 컬럼 필터 행 */}
          {filterConfig?.enableColumnFilters && (
            <TableRow className="border-b border-slate-200 bg-slate-50">
              {headerGroup.headers.map((header, colIndex) => {
                const canFilter = header.column.getCanFilter();
                const columnWidth = header.column.getSize();

                return (
                  <TableHead
                    key={`${header.id}-filter`}
                    className="px-3 py-2 h-14 border-r border-slate-200 last:border-r-0 bg-white"
                    colSpan={header.colSpan}
                    style={{
                      width: `${columnWidth}px`,
                      minWidth: `${columnWidth}px`,
                      maxWidth: `${columnWidth}px`,
                    }}
                  >
                    {!header.isPlaceholder &&
                    canFilter &&
                    onColumnFilterChange &&
                    getColumnFilterValue ? (
                      <ColumnFilter
                        value={getColumnFilterValue(header.column.id)}
                        onChange={(value) =>
                          onColumnFilterChange(header.column.id, value)
                        }
                        placeholder={`${header.column.columnDef.header} 검색...`}
                      />
                    ) : null}
                  </TableHead>
                );
              })}
            </TableRow>
          )}
        </React.Fragment>
      ))}
    </TableHeader>
  );
};
