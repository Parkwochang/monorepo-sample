'use client';

import React, { useEffect, useState } from 'react';
import {
  type ColumnDef,
  type Table as TableType,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
//package
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { cn } from '@workspace/ui/lib/utils';

// ----------------------------------------------------------------------

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  renderItem?: (table: TableType<TData>) => React.ReactElement;
  className?: string;
  type?: string;
  otherProps?: any;
  defaultSelectedRows?: TData[];
  defaultRow?: TData;
}

export const TableViewer = <TData,>({ data, columns, defaultRow, className, renderItem }: DataTableProps<TData>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [rowData, setRowData] = useState<TData[]>(data);

  useEffect(() => {
    setRowData(data);
    setRowSelection({});
  }, [data]);

  const table = useReactTable({
    data: rowData,
    columns,
    enableRowSelection: true,
    enableColumnPinning: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    initialState: {
      columnPinning: {
        left: ['expand-column'],
      },
    },
    state: {
      rowSelection,
    },
    meta: {
      addRow: () => {
        setRowData((pre) => {
          return defaultRow ? [...pre, defaultRow] : pre;
        });
      },
      updateData: (rowIndex, columnId, value) => {
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
    },
  });

  return (
    <>
      {renderItem && <div className="pb-5">{renderItem(table)}</div>}
      <div className="outline-none relative w-full overflow-x-auto">
        <Table className={className}>
          <TableHeader className="bg-a_gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="whitespace-nowrap">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'text-foreground font-bold text-center',
                        header.column.getIsPinned() && 'sticky left-0 bg-gray-100',
                      )}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  // className={'whitespace-nowrap even:bg-gray-50 border-b border-gray-200'}
                  data-state={row.getIsSelected() && 'selected'}
                  aria-keyshortcuts="Space"
                  onKeyDown={(e) => {
                    e.preventDefault();
                    if (e.key == ' ' || e.code == 'Space' || e.keyCode == 32) {
                      row.getToggleSelectedHandler()(e);
                    }
                  }}
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   e.stopPropagation();
                  //   row.getToggleSelectedHandler()(e);
                  // }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={cn(
                        'py-3 text-center',
                        cell.column.getIsPinned() &&
                          'sticky left-0 bg-background group-hover:bg-muted/90 group-data-[state=selected]:bg-muted',
                      )}
                      key={cell.id}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
