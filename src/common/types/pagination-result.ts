export interface PaginationResult {
  currentPage: number;
  nextPage?: number;
  prevPage?: number;
  limit?: number;
  pagesCount: number;
}
