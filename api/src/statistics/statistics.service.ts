import { Injectable, Logger } from '@nestjs/common';
import { dataByCategory, dataByPeriod, Interval } from 'common';
import { DateTime } from 'luxon';
import { CurrenciesService } from 'src/currencies/currencies.service';
import Category from 'src/database/models/category.model';
import Transaction, { categoryInId, categoryOutId } from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import { TransactionType } from 'src/transactions/transaction-type';
import Wallet from 'src/database/models/wallet.model';
import { chain, first } from 'lodash';

@Injectable()
export class StatisticsService {
  constructor(
    protected readonly currencyService: CurrenciesService
  ) { }

  public async getStatisticByPeriod(
    user: User,
    params: { interval: Interval } = { interval: 'month' },
  ): Promise<Array<{ date: string, amount: number }>> {
    const items = await Transaction.query()
      .withGraphFetched('[currency]')
      .where({ userId: user.id })
      .whereNot({ type: TransactionType.transfer })
      .whereNotIn('categoryId', [categoryInId, categoryOutId]);

    const data = dataByPeriod(items, params.interval);
    const keys = Object.keys(data);
    const rates = await this.currencyService.rates();

    return keys.map(date => ({
      date: DateTime.fromSeconds(+date).toISO(),
      amount: data[date]
        .reduce((acc, trx: Transaction) =>
          acc + this.currencyService.exchange(
            rates, trx.type === TransactionType.income ? +trx.amount : -Number(trx.amount), trx.currency.name, "USD"),
          0
        )
    }))
  }

  public async getStatisticByCategory(user: User) {
    const items = await Transaction.query()
      .withGraphFetched('[category]')
      .where({ userId: user.id });
    const data = dataByCategory(items, true);
    const categoryIds = data.map((d) => d.categoryId);
    const categories = await Category.query().whereIn('id', categoryIds);

    return data.map((d) => ({
      ...d,
      category: categories.find((c) => c.id === d.categoryId),
    }));
  }

  public async getStatisticByCurrency(user: User) {
    const wallets = await Wallet.query()
      .where({ userId: user.id })
      .whereNot({ type: 'goal' });

    return chain(wallets)
      .map(wallets => wallets.pockets)
      .flatten()
      .groupBy(pocket => pocket.currencyId)
      .map(group => {
        return {
          currencyId: first(group)?.currencyId,
          amount: group.reduce((acc, p) => p.amount + acc, 0)
        }
      })
      .value();
  }
}
