import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DateTime } from 'luxon';
import Goal from 'src/database/models/goal.model';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';
import { v4 as uuid } from 'uuid';
import { GoalCreate } from './input/goal-create';
import { transaction, TransactionOrKnex } from 'objection';
import { GoalUpdate } from './input/goal-update';

@Injectable()
export class GoalsService {
  public async getAll(user: User) {
    const goals = await Goal.query()
      .withGraphFetched('[wallet]')
      .where({ userId: user.id });

    return goals;
  }

  public async findOne(user: User, id: string) {
    const goal = await Goal.query()
      .withGraphFetched('[wallet]')
      .findOne({ id, userId: user.id });

    if (!goal) {
      throw new NotFoundException();
    }

    return goal;
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
