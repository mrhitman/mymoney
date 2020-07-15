import {
  Model,
  OrderByDirection,
  QueryBuilder,
  RelationExpression,
} from 'objection';

export interface QueryParams {
  relation?: RelationExpression<any>;
  limit?: number;
  offset?: number;
  sortDirection?: OrderByDirection;
  sortBy?: string;
  start?: number;
  end?: number;
}

export function bindFilters<T extends Model>(
  query: QueryBuilder<T, T[]>,
  params: QueryParams,
) {
  if (params.relation) {
    query.withGraphFetched(params.relation);
  }
}
