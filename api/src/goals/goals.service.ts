import { Injectable, NotFoundException } from '@nestjs/common';
import Goal from 'src/database/models/goal.model';
import User from 'src/database/models/user.model';

@Injectable()
export class GoalsService {
  public async getAll(user: User) {
    const goals = await Goal.query().where({ userId: user.id });

    return goals;
  }

  public async findOne(user: User, id: string) {
    const goal = await Goal.query().findOne({ id, userId: user.id });

    if (!goal) {
      throw new NotFoundException();
    }

    return goal;
  }

  public async delete(user: User, id: string) {
    const goal = await this.findOne(user, id);
    return goal.$query().delete();
  }
}
