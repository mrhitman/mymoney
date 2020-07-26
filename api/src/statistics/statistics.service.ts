import { Injectable } from '@nestjs/common';
import { dataByCategory, dataByPeriod, Interval } from 'common';
import Category from 'src/database/models/category.model';
import User from 'src/database/models/user.model';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class StatisticsService {
  constructor(readonly transactionsService: TransactionsService) {}

  public async getStatisticByPeriod(
    user: User,
    params: { interval: Interval } = { interval: 'month' },
  ) {
    const items = await this.transactionsService.getAll(user);
    return dataByPeriod(items.items, params.interval);
  }

  public async getStatisticByCategory(user: User) {
    const items = await this.transactionsService.getAll(user);
    const data = dataByCategory(items.items, true);
    const categoryIds = data.map((d) => d.categoryId);
    const categories = await Category.query().whereIn('id', categoryIds);
    return data.map((d) => ({
      ...d,
      category: categories.find((c) => c.id === d.categoryId),
    }));
  }
}
