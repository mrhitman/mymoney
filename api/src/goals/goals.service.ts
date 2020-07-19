import { Injectable, NotFoundException } from '@nestjs/common';
import Goal from 'src/database/models/goal.model';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';
import { v4 as uuid } from 'uuid';
import { GoalCreate } from './input/goal-create';
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
    const goal = await Goal.query().findOne({ id, userId: user.id });

    if (!goal) {
      throw new NotFoundException();
    }

    return goal;
  }

  public async create(user: User, data: GoalCreate) {
    const wallet = await Wallet.query().insert({
      id: uuid(),
      name: data.name,
      userId: user.id,
      type: 'goal',
    });
    console.log(wallet);
    const goal = await Goal.query().insert({
      id: uuid(),
      walletId: wallet.id,
      currencyId: data.currencyId,
      userId: user.id,
      goal: data.goal,
      progress: data.progress || 0,
    });
    return goal;
  }

  public async update(user: User, data: GoalUpdate) {}

  public async delete(user: User, id: string) {
    const goal = await this.findOne(user, id);
    return goal.$query().delete();
  }
}
