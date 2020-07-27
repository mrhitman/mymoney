import { chain, groupBy, reduce, sumBy, first } from 'lodash';
import * as moment from 'moment';
// import { TransactionLike } from '../transaction';

export type Interval = 'day' | 'week' | 'month' | 'year';
export function dataByPeriod(items: any[], interval: Interval) {
  const data = items
    .map((trx, i, trxs) => {
      const transactions = trxs
        .filter((t) => moment(trx.date).unix() >= moment(t.date).unix())

      return {
        date: trx.date,
        transactions,
      };
    })
    .sort((a, b) => moment(a.date).unix() - moment(b.date).unix());

  return reduce(
    groupStatistic(data, interval), (acc, group, interval) => ({ ...acc, [interval]: group }), {}
  );
}

export function dataByCategory(items: any[], withParents: boolean = false) {
  return chain(items)
    .groupBy('categoryId')
    .map((transactions, categoryId) => {
      return {
        categoryId,
        parentCategoryId: first(transactions).category.parent,
        transactions: transactions
      };
    })
    .value();
}

function groupStatistic(
  items: Array<{ date: moment.MomentInput }>,
  interval: Interval
) {
  switch (interval) {
    case 'day':
      return groupBy(items, (item) => moment(item.date).startOf('day').unix());
    case 'week':
      return groupBy(items, (item) => moment(item.date).startOf('week').unix());
    case 'month':
      return groupBy(items, (item) =>
        moment(item.date).startOf('month').unix()
      );
    case 'year':
      return groupBy(items, (item) => moment(item.date).startOf('year').unix());
    default:
      return groupBy(items, (item) =>
        moment(item.date).startOf('month').unix()
      );
  }
}
