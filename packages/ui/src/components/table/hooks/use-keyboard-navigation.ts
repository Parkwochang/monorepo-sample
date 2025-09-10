'use client';

import { useCallback, useEffect } from 'react';
import { type Table as TableType } from '@tanstack/react-table';
import type { CellSelection, CellPosition } from '../types';

interface UseKeyboardNavigationProps<TData> {
  table: TableType<TData>;
  selection: CellSelection;
  cellRefs: React.MutableRefObject<Map<string, HTMLElement>>;
  enableCellSelection: boolean;
  calculateSelectedCells: (start: CellPosition | null, end: CellPosition | null) => string[];
  setSelectionStart: (position: CellPosition | null) => void;
  setSelectionEnd: (position: CellPosition | null) => void;
  setSelectedCells: (cells: string[]) => void;
}

export const useKeyboardNavigation = <TData>({
  table,
  selection,
  cellRefs,
  enableCellSelection,
  calculateSelectedCells,
  setSelectionStart,
  setSelectionEnd,
  setSelectedCells,
}: UseKeyboardNavigationProps<TData>) => {
  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTableCellElement>, rowIndex: number, colIndex: number) => {
      const headerGroups = table.getHeaderGroups();
      if (!headerGroups.length) return;

      const totalRows = table.getRowModel().rows.length;
      const totalCols = headerGroups[0]?.headers.length ?? 0;
      let nextCell: HTMLElement | undefined;
      let nextRowIndex = rowIndex;
      let nextColIndex = colIndex;

      // 키보드 조작에 따른 다음 셀 인덱스 계산
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          table.options.meta?.activateEditableInput?.(rowIndex, colIndex);
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (rowIndex > 0) {
            nextRowIndex = rowIndex - 1;
            nextCell = cellRefs.current.get(`${nextRowIndex}-${colIndex}`);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (rowIndex < totalRows) {
            nextRowIndex = rowIndex + 1;
            nextCell = cellRefs.current.get(`${nextRowIndex}-${colIndex}`);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (colIndex > 0) {
            nextColIndex = colIndex - 1;
            nextCell = cellRefs.current.get(`${rowIndex}-${nextColIndex}`);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (colIndex < totalCols - 1) {
            nextColIndex = colIndex + 1;
            nextCell = cellRefs.current.get(`${rowIndex}-${nextColIndex}`);
          }
          break;
        case 'c':
          if ((e.ctrlKey || e.metaKey) && selection.selectedCells.length > 0) {
            e.preventDefault();
            copySelectedCells();
          }
          break;
        case 'v':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handlePasteFromClipboard(rowIndex, colIndex);
          }
          break;
      }

      // shift를 누르고 있으면서 방향키를 누르면 선택 영역 확장
      if (e.shiftKey && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        if (!selection.start) {
          setSelectionStart({ rowIndex, colIndex });
        }
        setSelectionEnd({ rowIndex: nextRowIndex, colIndex: nextColIndex });
        const newSelectedCells = calculateSelectedCells(selection.start || { rowIndex, colIndex }, {
          rowIndex: nextRowIndex,
          colIndex: nextColIndex,
        });
        setSelectedCells(newSelectedCells);
      } else if (!e.shiftKey && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        // shift 없이 방향키만 누르면 선택 초기화하고 포커스 이동
        setSelectionStart(null);
        setSelectionEnd(null);
        setSelectedCells([]);
      }

      nextCell?.focus();
    },
    [table, selection, cellRefs, calculateSelectedCells, setSelectionStart, setSelectionEnd, setSelectedCells],
  );

  // 선택한 셀 복사 기능
  const copySelectedCells = useCallback(() => {
    try {
      if (selection.selectedCells.length === 0) return;

      // 단일 셀 선택인 경우 selectionStart/End가 없을 수 있으므로 selectedCells에서 추출
      let startRow: number, endRow: number, startCol: number, endCol: number;

      if (selection.start && selection.end) {
        startRow = Math.min(selection.start.rowIndex, selection.end.rowIndex);
        endRow = Math.max(selection.start.rowIndex, selection.end.rowIndex);
        startCol = Math.min(selection.start.colIndex, selection.end.colIndex);
        endCol = Math.max(selection.start.colIndex, selection.end.colIndex);
      } else if (selection.selectedCells.length === 1) {
        // 단일 셀인 경우 - selectedCells에서 위치 추출
        const cellKey = selection.selectedCells[0];
        if (!cellKey) return;

        const [rowIndexStr, colIndexStr] = cellKey.split('-');
        const rowIndex = parseInt(rowIndexStr || '0', 10);
        const colIndex = parseInt(colIndexStr || '0', 10);

        if (isNaN(rowIndex) || isNaN(colIndex)) return;

        startRow = endRow = rowIndex;
        startCol = endCol = colIndex;
      } else {
        return;
      }

      const minRow = startRow;
      const maxRow = endRow;
      const minCol = startCol;
      const maxCol = endCol;

      // 선택된 행을 배열로 변환
      const rowsData: string[][] = [];

      for (let r = minRow; r <= maxRow; r++) {
        const rowData: string[] = [];

        for (let c = minCol; c <= maxCol; c++) {
          try {
            // 헤더 행인 경우
            if (r === 0) {
              const headerGroups = table.getHeaderGroups();
              const headerRow = headerGroups[0];

              if (headerRow && c < headerRow.headers.length) {
                const header = headerRow.headers[c];
                if (header && header.column && header.column.columnDef) {
                  const headerContent = header.column.columnDef.header;
                  const headerText = typeof headerContent === 'string' ? headerContent : '';
                  rowData.push(headerText);
                } else {
                  rowData.push('');
                }
              } else {
                rowData.push('');
              }
            } else {
              // 데이터 행
              const rows = table.getRowModel().rows;
              const rowIndex = r - 1; // rowIndex는 헤더를 포함하므로 1을 빼줍니다

              if (rowIndex >= 0 && rowIndex < rows.length) {
                const row = rows[rowIndex];
                if (row) {
                  const cells = row.getVisibleCells();
                  if (c >= 0 && c < cells.length) {
                    const cell = cells[c];
                    if (cell) {
                      let value = '';
                      try {
                        const cellValue = cell.getValue();
                        value = cellValue !== null && cellValue !== undefined ? String(cellValue) : '';
                      } catch (e) {
                        value = '';
                      }
                      rowData.push(value);
                    } else {
                      rowData.push('');
                    }
                  } else {
                    rowData.push('');
                  }
                } else {
                  rowData.push('');
                }
              } else {
                rowData.push('');
              }
            }
          } catch (e) {
            // 셀 처리 중 오류 발생 시 빈 문자열 추가
            rowData.push('');
          }
        }

        rowsData.push(rowData);
      }

      // TSV 형식으로 변환
      const tsvContent = rowsData.map((row) => row.join('\t')).join('\n');

      // 클립보드에 복사
      navigator.clipboard.writeText(tsvContent).catch((err) => {
        console.error('클립보드 복사 실패:', err);
      });
    } catch (e) {
      console.error('셀 복사 중 오류 발생:', e);
    }
  }, [selection, table]);

  // 붙여넣기 처리 함수
  const handlePasteFromClipboard = useCallback(
    async (rowIndex: number, colIndex: number) => {
      try {
        // 클립보드에서 텍스트 가져오기
        let clipboard = '';
        try {
          clipboard = await navigator.clipboard.readText();
        } catch (err) {
          console.error('클립보드 접근 오류:', err);
          return;
        }

        if (!clipboard) return;

        // 붙여넣을 시작 위치 (헤더는 건너뛰기)
        const startRow = rowIndex > 0 ? rowIndex - 1 : 0;
        const startCol = colIndex;

        // 데이터 파싱 (탭과 개행으로 구분된 값 처리)
        const clipboardRows = clipboard.split(/\r\n|\n|\r/).filter((row) => row.trim() !== '');
        if (!clipboardRows.length) return;

        // 데이터 테이블에 적용
        const tableModel = table.getRowModel();
        if (!tableModel) return;

        const tableRows = tableModel.rows || [];

        clipboardRows.forEach((rowStr, rowOffset) => {
          const rowValues = rowStr.split('\t');

          rowValues.forEach((cellValue, colOffset) => {
            const targetRowIndex = startRow + rowOffset;

            // 테이블 범위를 벗어나는지 확인
            if (targetRowIndex < 0 || targetRowIndex >= tableRows.length) {
              return;
            }

            const row = tableRows[targetRowIndex];
            if (!row) return;

            const targetColIndex = startCol + colOffset;
            const cells = row.getVisibleCells();
            if (!cells || !Array.isArray(cells) || targetColIndex < 0 || targetColIndex >= cells.length) {
              return;
            }

            const cell = cells[targetColIndex];
            if (!cell || !cell.column) return;

            const columnId = cell.column.id;
            if (!columnId) return;

            // 데이터 업데이트
            if (table.options.meta?.updateData) {
              table.options.meta.updateData(targetRowIndex, columnId, cellValue);
            }
          });
        });

        // 데이터 업데이트 후 선택 영역 갱신
        const rowsLength = tableRows ? tableRows.length - 1 : 0;
        const endRowIndex = Math.min(startRow + clipboardRows.length - 1, rowsLength);

        if (clipboardRows.length > 0) {
          const firstRowValues = clipboardRows[0]!.split('\t');
          if (firstRowValues.length > 0) {
            const endColOffset = firstRowValues.length - 1;

            const headerGroups = table.getHeaderGroups();
            const headerRow = headerGroups && headerGroups.length > 0 ? headerGroups[0] : null;
            const headerLength = headerRow && headerRow.headers ? headerRow.headers.length - 1 : 0;

            const newEndColIndex = Math.min(startCol + endColOffset, headerLength);

            // 붙여넣은 영역으로 선택 영역 변경
            const newSelectionStart = {
              rowIndex: startRow + 1,
              colIndex: startCol,
            };
            const newSelectionEnd = {
              rowIndex: endRowIndex + 1,
              colIndex: newEndColIndex,
            };

            setSelectionStart(newSelectionStart);
            setSelectionEnd(newSelectionEnd);

            const newSelectedCells = calculateSelectedCells(newSelectionStart, newSelectionEnd);
            setSelectedCells(newSelectedCells);
          }
        }
      } catch (error) {
        console.error('붙여넣기 처리 중 오류가 발생했습니다:', error);
      }
    },
    [table, calculateSelectedCells, setSelectionStart, setSelectionEnd, setSelectedCells],
  );

  // 전역 키보드 이벤트 리스너
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && selection.selectedCells.length > 0) {
        copySelectedCells();
      }
    };

    const handleGlobalPaste = (e: ClipboardEvent) => {
      if (selection.selectedCells.length > 0 && selection.start) {
        e.preventDefault();
        handlePasteFromClipboard(selection.start.rowIndex, selection.start.colIndex);
      }
    };

    if (enableCellSelection) {
      document.addEventListener('keydown', handleGlobalKeyDown);
      document.addEventListener('paste', handleGlobalPaste);

      return () => {
        document.removeEventListener('keydown', handleGlobalKeyDown);
        document.removeEventListener('paste', handleGlobalPaste);
      };
    }
  }, [selection, copySelectedCells, handlePasteFromClipboard, enableCellSelection]);

  return {
    handleKeyDown,
    copySelectedCells,
    handlePasteFromClipboard,
  };
};
