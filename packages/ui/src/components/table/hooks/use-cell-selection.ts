'use client';

import { useState, useCallback, useRef } from 'react';
import { type Table as TableType } from '@tanstack/react-table';
import type { CellPosition, CellSelection } from '../types';

export const useCellSelection = <TData>(table: TableType<TData>, enableCellSelection: boolean) => {
  const [selectionStart, setSelectionStart] = useState<CellPosition | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<CellPosition | null>(null);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const cellRefs = useRef<Map<string, HTMLElement>>(new Map());

  // 선택 영역 계산
  const calculateSelectedCells = useCallback((start: CellPosition | null, end: CellPosition | null): string[] => {
    if (!start || !end) return [];

    const minRow = Math.min(start.rowIndex, end.rowIndex);
    const maxRow = Math.max(start.rowIndex, end.rowIndex);
    const minCol = Math.min(start.colIndex, end.colIndex);
    const maxCol = Math.max(start.colIndex, end.colIndex);

    const cells: string[] = [];
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        cells.push(`${r}-${c}`);
      }
    }
    return cells;
  }, []);

  // 셀 선택 시작
  const handleCellMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement>, rowIndex: number, colIndex: number) => {
      if (!enableCellSelection || e.button !== 0) return;

      const newPosition = { rowIndex, colIndex };

      if (e.shiftKey && selectionStart) {
        setSelectionEnd(newPosition);
        const newSelectedCells = calculateSelectedCells(selectionStart, newPosition);
        setSelectedCells(newSelectedCells);
      } else {
        setSelectionStart(newPosition);
        setSelectionEnd(newPosition);
        setSelectedCells([`${rowIndex}-${colIndex}`]);
        setIsSelecting(true);
      }

      // 클릭된 셀에 포커스 설정
      const cellKey = `${rowIndex}-${colIndex}`;
      const targetCell = cellRefs.current.get(cellKey);
      if (targetCell) {
        targetCell.focus();
      }

      e.preventDefault();
    },
    [enableCellSelection, selectionStart, calculateSelectedCells],
  );

  // 셀 선택 드래그
  const handleCellMouseEnter = useCallback(
    (rowIndex: number, colIndex: number) => {
      if (!enableCellSelection || !isSelecting || !selectionStart) return;

      const newPosition = { rowIndex, colIndex };
      setSelectionEnd(newPosition);
      const newSelectedCells = calculateSelectedCells(selectionStart, newPosition);
      setSelectedCells(newSelectedCells);
    },
    [enableCellSelection, isSelecting, selectionStart, calculateSelectedCells],
  );

  // 셀 선택 완료
  const handleMouseUp = () => setIsSelecting(false);

  // 셀이 선택되었는지 확인
  const isCellSelected = useCallback(
    (rowIndex: number, colIndex: number) => {
      return selectedCells.includes(`${rowIndex}-${colIndex}`);
    },
    [selectedCells],
  );

  // 셀 참조 설정
  const setCellRef = useCallback((element: HTMLElement | null, rowIndex: number, colIndex: number) => {
    const key = `${rowIndex}-${colIndex}`;
    if (element) {
      cellRefs.current.set(key, element);
    } else {
      cellRefs.current.delete(key);
    }
  }, []);

  // 선택 초기화
  const clearSelection = useCallback(() => {
    setSelectionStart(null);
    setSelectionEnd(null);
    setSelectedCells([]);
    setIsSelecting(false);
  }, []);

  const selection: CellSelection = {
    start: selectionStart,
    end: selectionEnd,
    selectedCells,
    isSelecting,
  };

  return {
    selection,
    cellRefs,
    handleCellMouseDown,
    handleCellMouseEnter,
    handleMouseUp,
    isCellSelected,
    setCellRef,
    clearSelection,
    calculateSelectedCells,
    // 상태 setter 함수들 노출
    setSelectionStart,
    setSelectionEnd,
    setSelectedCells,
  };
};
