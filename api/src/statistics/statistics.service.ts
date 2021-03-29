import { BadRequestException, Injectable } from '@nestjs/common';
import { chain, first } from 'lodash';
import { DateTime } from 'luxon';
import {
  CurrenciesService,
  GetRateResponse,
} from 'src/currencies/currencies.service';
import Transaction from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import WalletHistory from 'src/database/models/wallet-history.model';
import Wallet from 'src/database/models/wallet.model';
import { TransactionType } from 'src/transactions/transaction-type';
import {
  GetStatisticByCategoryFilter,
  GetStatisticByCurrencyFilter,
  GetStatisticByPeriodFilter,
} from './types';

@Injectable()
export class StatisticsService {
  constructor(protected readonly currencyService: CurrenciesService) { }

  public async getStatisticByPeriod(
    user: User,
    params: GetStatisticByPeriodFilter = { interval: 'month' },
  ) {
    const query = WalletHistory.query().where({ userId: user.id });

    if (params.from) {
      query.where(
        'createdAt',
        '>=',
        DateTime.fromSeconds(params.from).setZone('utc').toRFC2822(),
      );
    }

    if (params.to) {
      query.where(
        'createdAt',
        '<=',
        DateTime.fromSeconds(params.to).setZone('utc').toRFC2822(),
      );
    }

    return query;
  }

  public async getStatisticByPeriod2(
    user: User,
    params: GetStatisticByPeriodFilter = { interval: 'month' },
  ) {
    function trxDateToDayFormat(trx: Transaction) {
      return DateTime.fromMillis(+trx.date)
        .setZone('utc')
        .toFormat('D');
    }

    let transactions = await Transaction.query().where({
      userId: user.id,
      type: 'outcome',
    });
    const outcome = chain(transactions)
      .groupBy(trxDateToDayFormat)
      .map((group) =>
        group.reduce(
          (acc, trx) => ({ ...acc, amount: acc.amount - Number(trx.amount) }),
          { amount: 0, name: 'outcome', date: trxDateToDayFormat(group[0]) },
        ),
      )
      .value();
    transactions = await Transaction.query().where({
      userId: user.id,
      type: 'income',
    });
    const income = chain(transactions)
      .groupBy(trxDateToDayFormat)
      .map((group) =>
        group.reduce(
          (acc, trx) => ({ ...acc, amount: acc.amount + Number(trx.amount) }),
          { amount: 0, name: 'income', date: trxDateToDayFormat(group[0]) },
        ),
      )
      .value();
    return [...outcome, ...income];
  }

  public async generateHistory(
    user: User,
    walletId: string,
    clearOldHistory = false,
  ) {
    const transactions = await this.getTransactionsByDays(user, walletId);
    const wallet = await Wallet.query()
      .where({
        userId: user.id,
        id: walletId,
      })
      .first();

    if (!wallet) {
      throw new BadRequestException('Invalid wallet');
    }

    if (clearOldHistory) {
      await WalletHistory.query().where({ userId: user.id, walletId }).delete();
    }

    const pockets = wallet.pockets;
    for (const date in transactions) {
      const summarizedDelta = this.summarizeTransactionsForDay(
        transactions[date],
      );

      Object.keys(summarizedDelta).forEach((currencyId) => {
        const pocket = pockets.find((p) => p.currencyId === currencyId);

        if (pocket) {
          pocket.amount += summarizedDelta[currencyId];
        } else {
          pockets.push({
            currencyId,
            amount: summarizedDelta[currencyId],
          });
        }
      });

      await WalletHistory.query().insert({
        userId: user.id,
        walletId,
        pockets,
        createdAt: DateTime.fromFormat(date, 'DD').toJSDate(),
      });
    }
  }

  public async getStatisticByCategory(
    user: User,
    filter: GetStatisticByCategoryFilter = {},
  ) {
    const query = Transaction.query()
      .withGraphFetched('[category, currency]')
      .where({ userId: user.id });

    if (filter.walletIds) {
      query.where((subquery) =>
        subquery
          .whereIn('sourceWalletId', filter.walletIds)
          .orWhereIn('destinationWalletId', filter.walletIds),
      );
    }

    if (filter.type) {
      query.where({ type: filter.type });
    }

    if (filter.from) {
      // @TODO check
      query.where(
        'date',
        '>=',
        DateTime.fromSeconds(filter.from).setZone('utc').toRFC2822(),
      );
    }

    if (filter.to) {
      // @TODO check
      query.where(
        'date',
        '<=',
        DateTime.fromSeconds(filter.to).setZone('utc').toRFC2822(),
      );
    }

    const items = await query.debug();
    const data = this.dataByCategory(items);
    const rates = await this.currencyService.rates();

    return data.map((group) => ({
      amount: this.getSumOfTransactionsWithExchange(
        group.transactions,
        rates,
        filter.currencyName || 'UAH',
      ),
      categoryId: group.categoryId,
      category: first(group.transactions).category,
    }));
  }

  protected getSumOfTransactionsWithExchange(
    transactions: Transaction[],
    rates: GetRateResponse,
    currencyName: string,
  ) {
    return transactions.reduce(
      (acc, trx: Transaction) =>
        acc +
        this.currencyService.exchange(
          rates,
          trx.type === TransactionType.income
            ? +trx.amount
            : -Number(trx.amount),
          trx.currency.name,
          currencyName,
        ),
      0,
    );
  }

  public async getStatisticByCurrency(
    user: User,
    filter: GetStatisticByCurrencyFilter = {},
  ) {
    const query = Wallet.query()
      .where({ userId: user.id })
      .whereNot({ type: 'goal' });

    if (filter.walletIds) {
      query.whereIn('id', filter.walletIds);
    }

    const wallets = await query;
    return chain(wallets)
      .map((wallets) => wallets.pockets)
      .flatten()
      .groupBy((pocket) => pocket.currencyId)
      .map((group) => {
        return {
          currencyId: first(group)?.currencyId,
          amount: group.reduce((acc, p) => p.amount + acc, 0),
        };
      })
      .value();
  }

  private async getTransactionsByDays(user: User, walletId: string) {
    const query = Transaction.query()
      .withGraphFetched('[currency]')
      .where({ userId: user.id })
      .where((q) =>
        q
          .where({ sourceWalletId: walletId })
          .orWhere({ destinationWalletId: walletId }),
      )
      .whereIn('type', ['income', 'outcome'])
      .orderBy('date', 'desc');

    return chain(await query)
      .groupBy((transaction) =>
        DateTime.fromMillis(+transaction.date).toFormat('DD'),
      )
      .value();
  }

  private summarizeTransactionsForDay(transactions: Transaction[]) {
    return transactions.reduce((acc, t) => {
      const m = t.type === TransactionType.outcome ? -1 : 1;

      return t.currencyId in acc
        ? {
          ...acc,
          [t.currencyId]: acc[t.currencyId] + Number(t.amount) * m,
        }
        : {
          ...acc,
          [t.currencyId]: Number(t.amount) * m,
        };
    }, {});
  }

  private dataByCategory(items: Transaction[]) {
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
}
