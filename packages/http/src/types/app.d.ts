/**
 * @type Http Response
 * @example
 * {
 *   data: Tdata;
 *   message: string;
 *   statusCode: string;
 * }
 */
export interface ResJson<Tdata> {
  data: Tdata;
  message: string;
  httpStatus: number;
  timestamp: string;
}

/**
 * @type Pagination
 * @example
 * {
 *   pageNumber: number;
 *   pageSize: number;
 *   totalPages: number;
 *   totalItems: number;
 * }
 */
export interface Pagination {
  page: number;
  page: number;
  totalPages: number;
  totalElements: number;
  empty: boolean;
  first: boolean;
  last: boolean;
}

export interface PaginationList<T>
  extends ResJson<
    {
      content: T[];
    } & Pagination
  > {}
