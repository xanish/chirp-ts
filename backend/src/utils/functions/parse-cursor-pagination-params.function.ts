import { ParsedQs } from 'qs';
import { ParsedCursorPaginationParams } from '../types/parsed-cursor-pagination-params.type.js';

export function parseCursorPaginationParams(
  query: ParsedQs
): ParsedCursorPaginationParams {
  const offset = query.offset ?? undefined;
  const limit = +(query.limit || 10);

  return {
    limit: limit,
    offset: offset ? BigInt(offset.toString()).valueOf() : undefined,
  };
}
