import { Injectable, Logger } from '@nestjs/common';
import { dataByCategory, dataByPeriod, Interval } from 'common';
import { DateTime } from 'luxon';
import { CurrenciesService } from 'src/currencies/currencies.service';
import Transaction, { categoryInId, categoryOutId } from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import { TransactionType } from 'src/transactions/transaction-type';
import Wallet from 'src/database/models/wallet.model';
import { chain, first } from 'lodash';
import { GetRateResponse } from 'common/responses';

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
      amount: this.sumTransactionsAmount(data[date], rates, "UAH"),
    }))
  }


  public async getStatisticByCategory(user: User, filter: { walletIds?: string[], currencyName?: string, type?: TransactionType, from?: number, to?: number } = {}) {
    const query = Transaction.query()
      .withGraphFetched('[category,currency]')
      .where({ userId: user.id });

    if (filter.walletIds) {
      query.where(subquery =>
        subquery
          .whereIn('sourceWalletId', filter.walletIds)
          .orWhereIn('destinationWalletId', filter.walletIds))
    }

    if (filter.type) {
      query.where({ type: filter.type });
    }

    if (filter.from) {
      query.where('date', '>=', DateTime.fromSeconds(filter.from).toISODate());
    }

    if (filter.to) {
      query.where('date', '<=', DateTime.fromSeconds(filter.to).toISODate());
    }

    const items = await query.debug();
    const data = dataByCategory(items, true);
    const rates = await this.currencyService.rates();

    return data.map((group) => ({
      amount: this.sumTransactionsAmount(group.transactions, rates, filter.currencyName || "UAH"),
      categoryId: group.categoryId,
      category: first(group.transactions).category
    }))
  }

  protected sumTransactionsAmount(transactions: Transaction[], rates: GetRateResponse, currencyName: string) {
    return transactions.reduce((acc, trx: Transaction) =>
      acc + this.currencyService.exchange(
        rates, trx.type === TransactionType.income ? +trx.amount : -Number(trx.amount), trx.currency.name, currencyName),
      0
    )
  }

  public async getStatisticByCurrency(user: User, filter: { walletIds?: string[] } = {}) {
    const query = Wallet.query()
      .where({ userId: user.id })
      .whereNot({ type: 'goal' });

    if (filter.walletIds) {
      query.whereIn('id', filter.walletIds);
    }

    const wallets = await query;
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
