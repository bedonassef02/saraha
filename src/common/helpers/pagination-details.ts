import { PaginationResult } from '../types/pagination-result';

export function paginationDetails({ count, limit, page }): PaginationResult {
  const pagesCount = Math.ceil(count / limit);
  const nextPage = page < pagesCount ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  return {
    currentPage: page,
    limit,
    pagesCount,
    nextPage,
    prevPage,
  };
}
