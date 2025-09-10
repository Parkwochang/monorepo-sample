import React from "react";
import { flexRender, type ColumnDef, type Row } from "@tanstack/react-table";
import { type VirtualItem } from "@tanstack/react-virtual";
import { cn } from "@workspace/ui/lib";
import { TableBody, TableCell, TableRow } from "../table.base";
import type { TableEventHandlers, VirtualizationConfig } from "../types";

interface TableBodyComponentProps<TData> {
  columns: ColumnDef<TData>[];
  rows: Row<TData>[];
  virtualRows: VirtualItem[];
  totalSize: number;
  virtualization: Required<VirtualizationConfig>;
  eventHandlers: TableEventHandlers;
  isCellSelected: (rowIndex: number, colIndex: number) => boolean;
  setCellRef: (
    element: HTMLElement | null,
    rowIndex: number,
    colIndex: number,
  ) => void;
}

export const TableBodyComponent = <TData,>({
  columns,
  rows,
  virtualRows,
  totalSize,
  virtualization,
  eventHandlers,
  isCellSelected,
  setCellRef,
}: TableBodyComponentProps<TData>) => {
  const { onCellMouseDown, onCellMouseEnter, onKeyDown } = eventHandlers;

  if (virtualRows.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-24 text-center text-gray-400 font-medium"
          >
            데이터가 없습니다.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {/* 상단 패딩 */}
      {virtualRows.length > 0 && (
        <tr>
          <td
            colSpan={columns.length}
            style={{ height: `${virtualRows[0]?.start || 0}px` }}
          />
        </tr>
      )}

      {/* 가상 행 */}
      {virtualRows.map((virtualRow) => {
        const row = rows[virtualRow.index];
        if (!row) return null;

        return (
          <TableRow
            key={row.id}
            className="whitespace-nowrap"
            data-state={row.getIsSelected() && "selected"}
            data-index={virtualRow.index}
          >
            {row.getVisibleCells().map((cell, colIndex) => {
              const columnWidth = cell.column.getSize();

              return (
                <TableCell
                  className={cn(
                    "text-center overflow-hidden text-ellipsis whitespace-nowrap",
                    "focus:outline-none focus:bg-blue-50",
                    isCellSelected(virtualRow.index + 1, colIndex) &&
                      "bg-blue-100",
                  )}
                  key={cell.id}
                  ref={(el) => setCellRef(el, virtualRow.index + 1, colIndex)}
                  onKeyDown={(e) =>
                    onKeyDown(e, virtualRow.index + 1, colIndex)
                  }
                  onMouseDown={(e) =>
                    onCellMouseDown(e, virtualRow.index + 1, colIndex)
                  }
                  onMouseEnter={() =>
                    onCellMouseEnter(virtualRow.index + 1, colIndex)
                  }
                  tabIndex={0}
                  style={{
                    height: `${virtualization.rowHeight}px`,
                    width: `${columnWidth}px`,
                    minWidth: `${columnWidth}px`,
                    maxWidth: `${columnWidth}px`,
                  }}
                >
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap w-full">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}

      {/* 하단 패딩 */}
      {virtualRows.length > 0 && (
        <tr>
          <td
            colSpan={columns.length}
            style={{
              height: `${totalSize - (virtualRows[virtualRows.length - 1]?.end || 0)}px`,
              padding: 0,
              border: "none",
              minHeight: "60px",
            }}
          />
        </tr>
      )}
    </TableBody>
  );
};
