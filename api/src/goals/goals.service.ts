import { Injectable, NotFoundException } from '@nestjs/common';
import Goal from 'src/database/models/goal.model';
import User from 'src/database/models/user.model';
import CreateGoalDto from 'src/goals/dto/create-goal.dto';
import UpdateGoalDto from 'src/goals/dto/update-goal.dto';

@Injectable()
export class GoalsService {
  public async findAll(user: User, params?: { eager?: string }) {
    const goals = await Goal.query().where({ userId: user.id });

    return goals;
  }

  public async findOne(id: string, user: User) {
    const goal = await Goal.query().findOne({ id });

    if (!goal) {
      throw new NotFoundException();
    }

    return goal;
  }

  public async create(data: CreateGoalDto, user: User) {}

  public async update(data: UpdateGoalDto, user: User) {}

  public async delete(id: string, user: User) {
    const goal = await this.findOne(id, user);
    return goal.$query().delete();
  }
}
