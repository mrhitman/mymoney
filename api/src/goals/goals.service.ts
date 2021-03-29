import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DateTime } from 'luxon';
import { transaction } from 'objection';
import Goal from 'src/database/models/goal.model';
import { categoryTransferId } from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';
import { TransactionType } from 'src/transactions/transaction-type';
import { TransactionsService } from 'src/transactions/transactions.service';
import { WalletsService } from 'src/wallets/wallets.service';
import { v4 as uuid } from 'uuid';
import { GoalCreate } from './input/goal-create';
import { GoalSave } from './input/goal-save';
import { GoalUpdate } from './input/goal-update';

@Injectable()
export class GoalsService {
  constructor(
    private readonly walletService: WalletsService,
    private readonly transactionService: TransactionsService,
  ) { }

  public async getAll(user: User) {
    const goals = await Goal.query().withGraphFetched('[wallet]').where({ userId: user.id });

    return goals;
  }

  public async findOne(user: User, id: string) {
    const goal = await Goal.query().withGraphFetched('[wallet]').findOne({ id, userId: user.id });

    if (!goal) {
      throw new NotFoundException();
    }

    return goal;
  }

  public async save(user: User, data: GoalSave) {
    const goal = await this.findOne(user, data.toGoalId);
    const wallet = await this.walletService.findOne(user, data.fromWalletId);

    await this.transactionService.create(user, {
      type: TransactionType.transfer,
      destinationWalletId: goal.walletId,
      categoryId: categoryTransferId,
      sourceWalletId: wallet.id,
      currencyId: data.currencyId,
      amount: data.amount,
      date: DateTime.local().toSeconds(),
    });

    return {
      goal,
      wallet,
    };
  }

  public async create(user: User, data: GoalCreate) {
    const dbTrx = await transaction.start(Wallet);
    try {
      const wallet = await Wallet.query().insert({
        id: uuid(),
        name: data.name,
        userId: user.id,
        type: 'goal',
        pockets: data.pockets || [],
      });
      const goal = await Goal.query().insert({
        id: uuid(),
        walletId: wallet.id,
        currencyId: data.currencyId,
        userId: user.id,
        goal: data.goal,
        progress: data.progress || 0,
        ...(data.createdAt && {
          createdAt: DateTime.fromSeconds(data.createdAt).toJSDate(),
        }),
      });

      await dbTrx.commit();

      return {
        ...goal,
        wallet,
      };
    } catch (e) {
      await dbTrx.rollback();
      throw new BadRequestException(e.message);
    }
  }

  public async update(user: User, data: GoalUpdate) {
    const goal = await this.findOne(user, data.id);
    const dbTrx = await transaction.start(Wallet);
    try {
      await goal.$query().update({
        goal: data.goal || goal.goal,
        progress: data.progress || goal.progress,
        ...(data.updatedAt && {
          updatedAt: DateTime.fromSeconds(data.updatedAt).toJSDate(),
        }),
      });

      await goal.wallet.$query().update({
        name: data.name || goal.wallet.name,
        pockets: data.pockets || goal.wallet.pockets,
      });

      await dbTrx.commit();
      return goal;
    } catch (e) {
      await dbTrx.rollback();
      throw new BadRequestException(e.message);
    }
  }

  public async delete(user: User, id: string) {
    const goal = await this.findOne(user, id);
    await goal.$query().delete();
    return goal;
  }
}
