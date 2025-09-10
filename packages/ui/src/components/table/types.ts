import { type ColumnDef, type Table as TableType } from "@tanstack/react-table";

// ----------------------------------------------------------------------
// 테이블 전역 타입 확장

declare module "@tanstack/react-table" {
  export interface TableMeta<TData extends unknown> {
    addRow: (row?: TData) => void;
    deleteRow?: (...idx: number[]) => void;
    updateData: (rowIndex: number, columnId: string, value: any) => void;
    insertData?: (data: TData[]) => void;
    activateEditableInput?: (rowIndex: number, colIndex: number) => void;
  }
}

// ----------------------------------------------------------------------
// 셀 선택 관련 타입

export interface CellPosition {
  rowIndex: number;
  colIndex: number;
}

export interface CellSelection {
  start: CellPosition | null;
  end: CellPosition | null;
  selectedCells: string[];
  isSelecting: boolean;
}

// ----------------------------------------------------------------------
// 가상화 설정 타입

export interface VirtualizationConfig {
  /**
   * 행 높이 (픽셀)
   * @default 45
   */
  rowHeight?: number;
  /**
   * 한번에 로드될 항목 오버스캔 수 (위/아래)
   * @default 10
   */
  overscan?: number;
  /**
   * 테이블 컨테이너 높이
   * @default 600
   */
  height?: number;
}

// ----------------------------------------------------------------------
// 필터링 & 정렬 관련 타입

export interface FilterConfig {
  /**
   * 필터 기능 활성화
   * @default false
   */
  enabled?: boolean;
  /**
   * 글로벌 검색 플레이스홀더
   * @default "검색..."
   */
  placeholder?: string;
  /**
   * 컬럼별 필터 활성화
   * @default false
   */
  enableColumnFilters?: boolean;
}

export interface SortingConfig {
  /**
   * 정렬 기능 활성화
   * @default false
   */
  enabled?: boolean;
  /**
   * 다중 컬럼 정렬 허용
   * @default false
   */
  enableMultiSort?: boolean;
  /**
   * 정렬 제거 허용 (none 상태)
   * @default true
   */
  enableSortingRemoval?: boolean;
}

// ----------------------------------------------------------------------
// 메인 테이블 Props 타입

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  renderItem: (table: TableType<TData>) => React.ReactElement;
  className?: string;
  type?: "page" | "modal";
  /**
   * 가상화 설정 옵션
   */
  virtualization?: VirtualizationConfig;
  /**
   * 컬럼 너비 설정
   * @default true
   */
  columnSizing?: boolean;
  /**
   * 셀 범위 선택 및 복사 기능 활성화
   * @default true
   */
  enableCellSelection?: boolean;
  /**
   * 필터링 설정
   */
  filtering?: FilterConfig;
  /**
   * 정렬 설정
   */
  sorting?: SortingConfig;
}

// ----------------------------------------------------------------------
// 이벤트 핸들러 타입

export interface TableEventHandlers {
  onCellMouseDown: (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number,
    colIndex: number,
  ) => void;
  onCellMouseEnter: (rowIndex: number, colIndex: number) => void;
  onMouseUp: () => void;
  onKeyDown: (
    e: React.KeyboardEvent<HTMLTableCellElement>,
    rowIndex: number,
    colIndex: number,
  ) => void;
}

// ----------------------------------------------------------------------
// 컨텍스트 타입

export interface TableContextValue<TData> {
  table: TableType<TData>;
  cellRefs: React.MutableRefObject<Map<string, HTMLElement>>;
  editableCellsState: React.MutableRefObject<
    Map<string, (isEditing: boolean) => void>
  >;
  selection: CellSelection;
  eventHandlers: TableEventHandlers;
  virtualization: Required<VirtualizationConfig>;
  enableCellSelection: boolean;
}
