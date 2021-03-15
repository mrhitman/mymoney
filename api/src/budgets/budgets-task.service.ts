import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import BudgetTemplate from 'src/database/models/budget-template.model';
import Budget from 'src/database/models/budget.model';
import User from 'src/database/models/user.model';
import moment from 'moment';

@Injectable()
export class BudgetsTaskService {

  /**
   * Every  minutes
   */
  @Cron('0 0 1 * *')
  public async pushRepeatableTransactions() {
    const users = await User.query();
    for (const user of users) {
      const template = await BudgetTemplate
        .query()
        .where({ userId: user.id, active: true })
        .orderBy('date')
        .first();

      await Budget.query().insert({
        incomes: template?.incomes || [],
        outcomes: template?.outcomes || [],
        savings: template?.savings || [],
        date: moment().startOf('month').toDate(),
        deadline: moment().endOf('month').toDate(),
        active: !!template,
        userId: user.id,
      });
    }
  }
}
