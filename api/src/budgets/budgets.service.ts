import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { raw } from 'objection';
import Budget from 'src/database/models/budget.model';
import Transaction, { categoryInId } from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import { BudgetCategoryCreate } from './input/budget-category-create';
import { BudgetUpdate } from './input/budget-update';

@Injectable()
export class BudgetsService {
  public async getAll(user: User) {
    const query = Budget.query().where({ userId: user.id });
    return query;
  }

  public async findOne(user: User, id: string) {
    const budget = await Budget.query().findOne({ id, userId: user.id });

    if (!budget) {
      throw new NotFoundException();
    }

    return budget;
  }

  public async update(user: User, data: BudgetUpdate) {
    const budget = await Budget.query().findOne({ id: data.id, userId: user.id });

    if (!budget) {
      throw new NotFoundException();
    }

    await budget
      .$query()
      .update({
        date: data.date,
        deadline: data.deadline,
      })
      .skipUndefined();

    return budget;
  }

  public async getActiveBudget(user: User) {
    const budget = await Budget.query()
      .where({ userId: user.id })
      .andWhere('date', '<=', raw('now()'))
      .andWhere('deadline', '>=', raw('now()'))
      .first();

    if (!budget) {
      throw new BadRequestException('No active budgets');
    }

    return budget;
  }

  public async addOutcomeCategory(user: User, data: BudgetCategoryCreate) {
    const budget = await this.getActiveBudget(user);

    if (budget.outcomes.find((c) => c.categoryId === data.categoryId)) {
      return budget;
    }

    if (data.recalculateProgress) {
      data.progress = await this.getCategoryProgress(user, budget, data.categoryId);
      Logger.log(data);
    }

    await budget.$query().update({
      outcomes: [...budget.outcomes, data],
    });

    return budget;
  }

  public async addIncomeCategory(user: User, data: BudgetCategoryCreate) {
    const budget = await this.getActiveBudget(user);

    if (budget.incomes.find((c) => c.categoryId === data.categoryId)) {
      return budget;
    }

    if (data.recalculateProgress) {
      data.progress = await this.getCategoryProgress(user, budget, data.categoryId);
    }

    await budget.$query().update({
      incomes: [...budget.incomes, data],
    });

    return budget;
  }

  protected async getCategoryProgress(user: User, budget: Budget, categoryId: string) {
    const transactions = await Transaction.query()
      .where({
        userId: user.id,
        categoryId,
      })
      .andWhereBetween('date', [budget.date, budget.deadline]);

    return Math.abs(transactions.reduce((acc, trx) => acc + Number(trx.amount), 0));
  }

  public async removeOutcomeCategory(user: User, categoryId: string) {
    const budget = await this.getActiveBudget(user);

    await budget.$query().update({
      outcomes: budget.outcomes.filter((c) => c.categoryId !== categoryId),
    });

    return budget;
  }

  public async removeIncomeCategory(user: User, categoryId: string) {
    const budget = await this.getActiveBudget(user);

    await budget.$query().update({
      incomes: budget.incomes.filter((c) => c.categoryId !== categoryId),
    });

    return budget;
  }

  public async outcome(user: User, trx: Transaction) {
    try {
      const budget = await this.getActiveBudget(user);
      await budget.$query().update({
        outcomes: budget.outcomes.map((o) =>
          o.categoryId === trx.categoryId ? { ...o, progress: o.progress + trx.amount } : o,
        ),
      });
    } catch (e) {}
  }

  public async income(user: User, trx: Transaction) {
    try {
      const budget = await this.getActiveBudget(user);
      const budgetCategory = budget.incomes.find((o) => o.categoryId === trx.categoryId);

      if (budgetCategory) {
        budgetCategory.progress += trx.amount;
      }
    } catch (e) {}
  }
}
