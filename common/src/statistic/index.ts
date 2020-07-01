import { chain, groupBy, reduce, sumBy } from 'lodash';
import * as moment from 'moment';
// import { TransactionLike } from '../transaction';

export type Interval = 'day' | 'week' | 'month' | 'year';

export function dataByPeriod(items: any[], interval: Interval) {
  const data = items
    .map((trx, i, transactions) => {
      const amount = transactions
        .filter((t) => moment(trx.date).unix() >= moment(t.date).unix())
        .reduce((s, t) => {
          return (
            s +
            (t.type === 'outcome' ? -1 * Number(t.amount) : Number(t.amount))
          );
        }, 0);

      return {
        date: trx.date,
        amount,
      };
    })
    .sort((a, b) => moment(a.date).unix() - moment(b.date).unix());

  const grouped = groupStatistic(data, interval);
  return reduce(
    grouped,
    (acc, group, interval) => {
      return { ...acc, [interval]: sumBy(group, 'amount') };
    },
    {}
  );
}

export function dataByCategory(items: any[]) {
  const groups = chain(items)
    .groupBy('categoryId')
    .map((group, categoryId) => {
      return {
        categoryId,
        amount: group.reduce(
          (acc, trx) =>
            acc +
            (trx.type === 'income'
              ? parseInt(trx.amount, 10)
              : -parseInt(trx.amount, 10)),
          0
        ),
      };
    })
    .value();

  console.log(items);
  return groups;
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
