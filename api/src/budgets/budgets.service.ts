import { Injectable } from '@nestjs/common';
import User from 'src/database/models/user.model';
import Transaction from 'src/database/models/transaction.model';
import Budget from 'src/database/models/budget.model';

@Injectable()
export class BudgetsService {
    public async outcome(user: User, trx: Transaction) {
        const budget = await Budget
            .query()
            .where({ userId: user.id, active: true })
            .first();

        if (budget) {
            const budgetCategory = budget.outcomes.find(o => o.categoryId === trx.categoryId);

            if (budgetCategory) {
                budgetCategory.progress += trx.amount;
            }
        }
    }

    public async income(user: User, trx: Transaction) {
        const budget = await Budget
            .query()
            .where({ userId: user.id, active: true })
            .first();

        if (budget) {
            const budgetCategory = budget.incomes.find(o => o.categoryId === trx.categoryId);

            if (budgetCategory) {
                budgetCategory.progress += trx.amount;
            }
        }
    }
}
