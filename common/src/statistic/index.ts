import { chain, first, groupBy } from 'lodash';
import * as moment from 'moment';

export type Interval = 'day' | 'week' | 'month' | 'year';
export function dataByPeriod(items: any[], interval: Interval) {
  return groupStatistic(items, interval);
}

export function dataByCategory(items: any[], withParents: boolean = false) {
  return chain(items)
    .groupBy('categoryId')
    .map((transactions, categoryId) => {
      return {
        categoryId,
        parentCategoryId: first(transactions).category.parent,
        transactions: transactions,
      };
    })
    .value();
}

function groupStatistic(
  items: Array<{ date: moment.MomentInput }>,
  interval: Interval,
): Record<string, any> {
  switch (interval) {
    case 'day':
      return groupBy(items, (item) => moment(item.date).startOf('day').unix());
    case 'week':
      return groupBy(items, (item) => moment(item.date).startOf('week').unix());
    case 'month':
      return groupBy(items, (item) => moment(item.date).startOf('month').unix());
    case 'year':
      return groupBy(items, (item) => moment(item.date).startOf('year').unix());
    default:
      return groupBy(items, (item) => moment(item.date).startOf('month').unix());
  }
}
