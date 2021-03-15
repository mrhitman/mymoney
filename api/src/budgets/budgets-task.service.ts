import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import User from 'src/database/models/user.model';
import { BudgetsService } from './budgets.service';

@Injectable()
export class BudgetsTaskService {
  constructor(protected readonly service: BudgetsService) {
  }

  /**
   * Every month
   */
  @Cron('0 0 1 * *')
  public async processBudgets() {
    const users = await User.query();
    await Promise.all(users.map(
      user => Promise.all([
        this.service.disableBudget(user),
        this.service.createBudgetFromActiveTemplate(user)
      ])
    ));
  }
}
