import { Injectable, Logger } from '@nestjs/common';
import { dataByCategory, dataByPeriod, Interval } from 'common';
import Category from 'src/database/models/category.model';
import User from 'src/database/models/user.model';
import { TransactionsService } from 'src/transactions/transactions.service';
import Transaction from 'src/database/models/transaction.model';
import { DateTime } from 'luxon';
import { CurrenciesService } from 'src/currencies/currencies.service';

@Injectable()
export class StatisticsService {
  constructor(
    protected readonly transactionsService: TransactionsService,
    protected readonly currencyService: CurrenciesService
  ) { }

  public async getStatisticByPeriod(
    user: User,
    params: { interval: Interval } = { interval: 'month' },
  ): Promise<Array<{ date: string, amount: number }>> {
    const items = await this.transactionsService.getAll(user);
    const data = dataByPeriod(items.items, params.interval);
    const keys = Object.keys(data);

    return keys.map(date => ({
      date: DateTime.fromSeconds(+date).toISO(),
      amount: data[date].length
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
}
