import { ParsedQs } from 'qs';
import { ParsedPaginationParams } from '../types/parsed-pagination-params.type.js';

export function parsePaginationParams(query: ParsedQs): ParsedPaginationParams {
  const offset = query.offset ?? 0;
  const limit = +(query.limit || 10);

  return {
    limit: limit,
    offset: offset ? +offset : 0,
  };
}
