import { Injectable, NotFoundException } from '@nestjs/common';
import Goal from 'src/database/models/goal.model';
import User from 'src/database/models/user.model';

@Injectable()
export class GoalsService {
  public async findAll(user: User, params?: { eager?: string }) {
    const goals = await Goal.query();

    return goals;
  }

  public async findOne(id: string) {
    const goal = await Goal.query().findOne({ id });

    if (!goal) {
      throw new NotFoundException();
    }

    return goal;
  }
}
