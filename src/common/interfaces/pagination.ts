import { PaginationResult } from "../types/pagination-result";

export interface Pagination {
  pagination({}): Promise<PaginationResult>;
}